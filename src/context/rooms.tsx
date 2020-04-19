import * as React from 'react';
import { Users } from 'src/App';
import { getRooms } from 'src/core/api';

interface RoomContext {
  ownRooms: Room[];
  joinedRooms: Room[];
  roomFetchStatus: HttpRequestStatus;
  setOwnRooms?: (rooms: Room[]) => void;
  setJoinedRooms?: (rooms: Room) => void;
}

export const roomContext = React.createContext<RoomContext>({
  ownRooms: [],
  joinedRooms: [],
  roomFetchStatus: '',
});

export const RoomProvider: React.SFC = (props) => {
  const [ownRooms, setOwnRooms] = React.useState([]);
  const [joinedRooms, setJoinedRooms] = React.useState([]);
  const [roomFetchStatus, setRoomFetchStatus] = React.useState<
    HttpRequestStatus
  >('');
  const userContext = React.useContext(Users);

  React.useEffect(() => {
    if (userContext.user && roomFetchStatus === '') {
      setRoomFetchStatus('pending');
      getRooms()
        .then((rooms) => {
          setOwnRooms(rooms);
          setRoomFetchStatus('fulfilled');
        })
        .catch((err) => {
          console.error(err);
          setRoomFetchStatus('rejected');
        });
    }
  }, [userContext.user]);

  return (
    <roomContext.Provider
      value={{
        ownRooms,
        joinedRooms,
        roomFetchStatus,
        setOwnRooms,
        setJoinedRooms: (room: Room) => setJoinedRooms([...joinedRooms, room]),
      }}
    >
      {props.children}
    </roomContext.Provider>
  );
};

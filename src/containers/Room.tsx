import * as React from 'react';
import { FiLock } from 'react-icons/fi';
import styled from 'styled-components';
import EventTray from 'src/containers/Events';
import UserPanel from 'src/containers/Users';
import DiceControl from 'src/containers/Dice';
import { Users } from 'src/App';
import { roomContext } from 'src/context/rooms';
import { getRoom } from 'src/core/api';
import { useParams } from 'react-router';

export default () => {
  const userContext = React.useContext(Users);
  const rooms = React.useContext(roomContext);
  const { joinedRooms } = rooms;
  const roomMap = joinedRooms.map((item) => item.room_id);
  const { roomId } = useParams();
  const selectedRoom = joinedRooms.find((room) => room.room_id === roomId);

  React.useEffect(() => {
    if (!roomMap.includes(roomId)) {
      getRoom(roomId).then((room) => rooms.setJoinedRooms(room));
    }
  }, [roomId]);

  return (
    <>
      <MainPanel>
        <Logout onClick={userContext.logOut}>
          <FiLock />
          Log out
        </Logout>
        {selectedRoom ? (
          <>
            <UserPanel />
            <DiceControl />
          </>
        ) : (
          <div>Missing wanted room.</div>
        )}
      </MainPanel>
      <EventTray />
    </>
  );
};

const MainPanel = styled.section`
  flex: 2;
  display: flex;
  flex-direction: column;
  height: auto;
  align-self: flex-start;
  position: relative;
`;

const Logout = styled.button`
  font-size: 1rem;
  color: #fff;
  position: absolute;
  right: 0rem;
  top: -2rem;
  background: transparent;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  > svg {
    margin-right: 0.5rem;
  }

  &:hover {
    color: #bb3f3f;
  }
`;

import * as React from 'react';
import styled from 'styled-components';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { FiSearch, FiFolderPlus } from 'react-icons/fi';
import { useHistory, Link } from 'react-router-dom';
import { postNewRoom } from 'src/core/api';
import { roomContext } from 'src/context/rooms';

const Rooms = () => {
  const rooms = React.useContext(roomContext);
  const history = useHistory();
  const [search, setSearch] = React.useState('');
  const [roomName, setNewRoomName] = React.useState('');

  const onCreate = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    postNewRoom(roomName).then((room: Room) =>
      history.push(`/room/${room.room_id}/`)
    );
  };

  console.log('rooms', rooms);

  return (
    <RoomContainer>
      <RoomControls>
        <RoomSection>
          <p>Join a room with the ID provided by your dungeonmaster.</p>
          <RoomInput>
            <Input
              label="Room ID"
              onChange={(ev) => setSearch(ev.target.value)}
            />
            <Button
              onClick={() => {
                rooms.setSelectedRoom(search);
                return history.push(`/room/${search}/`);
              }}
              disabled={search.length !== 26}
              label={
                <>
                  <FiSearch />
                  Let's go
                </>
              }
            />
          </RoomInput>
        </RoomSection>
        <RoomSection>
          <p>Create a new room and invite your friends to play.</p>
          <RoomInput>
            <Input
              label="Name for room"
              onChange={(ev) => setNewRoomName(ev.target.value)}
            />
            <Button
              onClick={onCreate}
              label={
                <>
                  <FiFolderPlus />
                  Create
                </>
              }
            />
          </RoomInput>
        </RoomSection>
      </RoomControls>
      <RoomSection>
        {rooms.ownRooms.map((room: Room) => (
          <Link
            key={room.room_id}
            to={`/room/${room.room_id}/`}
            onClick={() => rooms.setSelectedRoom(room.room_id)}
          >
            {room.room_name}: {room.room_id}
          </Link>
        ))}
      </RoomSection>
    </RoomContainer>
  );
};

export default Rooms;

const RoomContainer = styled.section`
  max-width: 900px;
  background: #f2f2f2;
  padding: 1rem;
  border-radius: 5px;
`;

const RoomSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
  > p {
    margin-bottom: 1rem;
  }
`;

const RoomInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  > button {
    margin-left: 1rem;
    margin-bottom: 0.5rem;
  }
`;

const RoomControls = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    flex: 1;
  }
`;

import * as React from 'react';
import styled from 'styled-components';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { FiSearch, FiFolderPlus } from 'react-icons/fi';

const Rooms = () => {
  const [search, setSearch] = React.useState('');
  const [showForm, toggleForm] = React.useState(false);

  const onSearch = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    console.log('Search', search);
  };

  return (
    <RoomContainer>
      <h2>My rooms</h2>
      <h3>Other rooms</h3>
      <Input label="Room name" onChange={(ev) => setSearch(ev.target.value)} />
      <Button
        onClick={onSearch}
        label={
          <>
            <FiSearch />
            Find room
          </>
        }
      />
      <Button
        onClick={() => toggleForm(!showForm)}
        label={
          <>
            <FiFolderPlus />
            New room
          </>
        }
      />
    </RoomContainer>
  );
};

export default Rooms;

const RoomContainer = styled.section`
  background: #f2f2f2;
  padding: 1rem;
  border-radius: 5px;
`;

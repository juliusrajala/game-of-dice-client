import * as React from 'react';
import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';

interface Props {
  character: Character;
}

const Character = (props: Props) => {
  return (
    <CharacterItem>
      <FiUser />
      <h3>{props.character.character_name}</h3>
    </CharacterItem>
  );
};

export default Character;

const CharacterItem = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: yellow;

  > svg {
    font-size: 60px;
  }

  > h3 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    background: #2f2f2f;
    color: #fff;
    padding: 0.25rem 1rem;
    border-radius: 3px;
    position: absolute;
    bottom: -1rem;
    left: auto;
    right: auto;
  }
`;

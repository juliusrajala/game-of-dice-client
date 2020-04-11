import * as React from 'react';
import styled from 'styled-components';

interface Props {
  character: Character;
}

const Character = (props: Props) => {
  return <CharacterItem>{props.character.character_name}</CharacterItem>;
};

export default Character;

const CharacterItem = styled.div`
  width: 150px;
`;

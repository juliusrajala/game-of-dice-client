import * as React from 'react';
import styled from 'styled-components';
import Character from 'src/components/Character';

const Characters = () => {
  const [characters, setCharacters] = React.useState<Character[]>([]);
  return (
    <CharacterContainer>
      Characters
      <CharacterList>
        {characters.map((character) => (
          <Character character={character} />
        ))}
      </CharacterList>
    </CharacterContainer>
  );
};

export default Characters;

const CharacterContainer = styled.div`
  padding: 1rem;
`;

const CharacterList = styled.div`
  display: flex;
  flex-direction: row;
`;

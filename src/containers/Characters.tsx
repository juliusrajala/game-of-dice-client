import * as React from 'react';
import styled from 'styled-components';
import Character from 'src/components/Character';
import Button from 'src/components/Button';
import { FiFilePlus } from 'react-icons/fi';
import CharacterForm from 'src/components/CharacterForm';
import { useRequestedData } from 'src/hooks/http';
import { getCharacters } from 'src/core/api';
import { useStoredUser } from 'src/hooks/storage';

const Characters = () => {
  const userId = useStoredUser();
  const [displayForm, toggleForm] = React.useState(false);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const hasCharacter = characters.reduce(
    (curr, next) => curr || next.owner_id === userId,
    false
  );

  const [characterRequest] = useRequestedData<Character[]>(getCharacters());

  React.useEffect(() => {
    if (characterRequest.status === 'fulfilled' && !!characterRequest.data) {
      setCharacters(characterRequest.data);
    }
  }, [characterRequest.status]);

  if (displayForm) {
    return (
      <CharacterContainer>
        <Topic>New character</Topic>
        <CharacterForm toggleForm={() => toggleForm(!displayForm)} />
      </CharacterContainer>
    );
  }
  return (
    <CharacterContainer>
      <Topic>Characters in game</Topic>
      <CharacterList>
        {characters.map((character) => (
          <Character character={character} />
        ))}
      </CharacterList>
      {!hasCharacter && (
        <Button
          onClick={() => toggleForm(true)}
          label={
            <>
              <FiFilePlus /> New character
            </>
          }
        />
      )}
    </CharacterContainer>
  );
};

export default Characters;

const CharacterContainer = styled.div`
  padding: 1rem 0rem;
`;

const Topic = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
`;

const CharacterList = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;

  > * {
    margin-right: 2rem;
  }
`;

import * as React from 'react';
import styled from 'styled-components';
import Character from 'src/components/Character';
import Button from 'src/components/Button';
import { FiFilePlus } from 'react-icons/fi';
import CharacterForm from 'src/components/CharacterForm';
import { useRequestedData } from 'src/hooks/http';
import { getCharacters } from 'src/core/api';
import { useStoredUser } from 'src/hooks/storage';
import { Sockets } from 'src/context/socket';

const Characters = () => {
  const userId = useStoredUser();
  const socketContext = React.useContext(Sockets);
  const [displayForm, toggleForm] = React.useState(false);
  const [characters, setCharacters] = React.useState<Character[]>([]);
  const hasCharacter = characters.reduce(
    (curr, next) => curr || next.owner_id === userId,
    false
  );

  React.useEffect(() => {
    const { message } = socketContext;
    if (message && message.event_type === 'character_event') {
      const targetCharacter = message.data;
      const newCharacters = characters
        .filter((char) => char.character_id !== targetCharacter.character_id)
        .concat(targetCharacter);
      setCharacters(newCharacters);
    }
  }, [socketContext.message]);

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
      <Topic>Player characters</Topic>
      <CharacterList>
        {characters
          .sort((a, b) => a.hit_points - b.hit_points)
          .map((character) => (
            <Character key={character.character_id} character={character} />
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

const CharacterContainer = styled.div``;

const Topic = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
`;

const CharacterList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

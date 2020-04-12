import * as React from 'react';
import styled from 'styled-components';
import { FiUser, FiHeart, FiShield, FiZap } from 'react-icons/fi';
import { useStoredUser } from 'src/hooks/storage';

interface Props {
  character: Character;
}

const Character = (props: Props) => {
  const userId = useStoredUser();
  const { character } = props;
  return (
    <CharacterContainer>
      <CharacterItem
        cssProps={{
          accent: props.character.accent_color,
          owned: character.owner_id === userId,
        }}
      >
        <FiUser />
        <h3>{props.character.character_name}</h3>
      </CharacterItem>
      <CardOverlay cssProps={{ accent: props.character.accent_color }}>
        <span>
          <FiUser />
          {character.character_name}
        </span>
        <span>
          <FiHeart />
          {character.hit_points - (character.damage_taken || 0)}/
          {character.hit_points}
        </span>
        <span>
          <FiShield />
          {character.armor_class}
        </span>
        <span>
          <FiZap />+ {character.attack_bonus}
        </span>
      </CardOverlay>
    </CharacterContainer>
  );
};

export default Character;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  align-items: center;
  width: 300px;
`;

const CardOverlay = styled.div`
  margin-left: 1rem;
  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.25rem;
    width: auto;
    color: #3f3f3f;
    font-weight: 600;

    > svg {
      color: ${(props: JSX.IntrinsicAttributes) =>
        props.cssProps.accent || '#fff'};
      background: #3f3f3f;
      padding: 0.125rem 0.25rem;
      border-radius: 4px;
      margin-right: 0.5rem;
      font-size: 22px;
      font-weight: 600;
    }
  }
`;

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
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  color: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.accent || '#0fbcf9'};
  cursor: pointer;
  background: #3f3f3f;
  border: 3px solid
    ${(props: JSX.IntrinsicAttributes) =>
      props.cssProps.owned ? props.cssProps.accent : 'transparent'};
  > svg {
    font-size: 40px;
  }

  > h3 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    background: #2f2f2f;
    color: #fff;
    padding: 0.25rem;
    border-radius: 3px;
    position: absolute;
    bottom: -1rem;
    left: auto;
    right: auto;
    transition: box-shadow ease-in-out 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
    font-size: 1rem;
    color: ${(props: JSX.IntrinsicAttributes) =>
      props.cssProps.owned ? props.cssProps.accent : '#fff'};
  }
`;

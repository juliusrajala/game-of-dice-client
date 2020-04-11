import * as React from 'react';
import styled from 'styled-components';
import { FiUser, FiHeart, FiShield, FiZap } from 'react-icons/fi';

interface Props {
  character: Character;
}

const Character = (props: Props) => {
  const [selected, setSelected] = React.useState(false);
  const { character } = props;
  return (
    <CharacterItem
      onClick={() => setSelected(!selected)}
      cssProps={{ accent: props.character.accent_color, selected }}
    >
      <FiUser />
      <h3>{props.character.character_name}</h3>
      <CardOverlay
        cssProps={{ accent: props.character.accent_color, selected }}
      >
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
    </CharacterItem>
  );
};

export default Character;

const CardOverlay = styled.div`
  padding: 1rem;
  position: absolute;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  color: ${(props: JSX.IntrinsicAttributes) => props.cssProps.accent || '#fff'};
  display: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.selected ? 'auto' : 'none'};
  z-index: 3;
  top: -10px;
  right: -150px;
  background: #3f3f3f;
  > span {
    display: flex;
    flex-direction: row;
    padding: 0.5rem 0rem;

    > svg {
      margin-right: 0.5rem;
      font-size: 20px;
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  color: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.accent || '#0fbcf9'};
  cursor: pointer;
  background: #3f3f3f;
  transition: box-shadow ease-in-out 0.2s;
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
  }
  &:hover,
  &:focus {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);

    > h3 {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    }
  }
`;

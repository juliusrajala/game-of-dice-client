import * as React from 'react';
import styled from 'styled-components';
import {
  FiUser,
  FiHeart,
  FiShield,
  FiZap,
  FiMinus,
  FiPlusCircle,
  FiEye,
  FiFeather,
  FiActivity,
} from 'react-icons/fi';
import { Users } from 'src/App';

interface Props {
  character: Character;
}

const Character = (props: Props) => {
  const userContect = React.useContext(Users);
  const { user } = userContect;
  const { character } = props;
  return (
    <CharacterContainer>
      <CharacterItem
        cssProps={{
          accent: props.character.accent_color,
          owned: character.owner_id === user.user_id,
        }}
      >
        {user.is_admin && (
          <>
            <DamageButton>
              <FiZap />
            </DamageButton>
            <HealButton>
              <FiPlusCircle />
            </HealButton>
          </>
        )}
        <FiUser />
        <h3>{props.character.character_name}</h3>
      </CharacterItem>
      <CardOverlay cssProps={{ accent: props.character.accent_color }}>
        <span>
          <Label cssProps={{ accent: props.character.accent_color }}>
            <FiHeart />
            hp
          </Label>
          {character.hit_points - (character.damage_taken || 0)}/
          {character.hit_points}
        </span>
        <span>
          <Label cssProps={{ accent: props.character.accent_color }}>
            <FiShield />
            ac
          </Label>
          {character.armor_class}
        </span>
        <span>
          <Label cssProps={{ accent: props.character.accent_color }}>
            <FiZap />
            ab
          </Label>
          +{character.attack_bonus}
        </span>
      </CardOverlay>
      <CardOverlay cssProps={{ accent: props.character.accent_color }}>
        <span>
          <Label cssProps={{ accent: props.character.accent_color }}>
            <FiActivity />
            Fo
          </Label>
          {character.fortitude}
        </span>
        <span>
          <Label cssProps={{ accent: props.character.accent_color }}>
            <FiFeather />
            Re
          </Label>
          {character.reflex}
        </span>
        <span>
          <Label cssProps={{ accent: props.character.accent_color }}>
            <FiEye />
            Wi
          </Label>
          {character.will}
        </span>
      </CardOverlay>
    </CharacterContainer>
  );
};

export default Character;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1.5rem;
  align-items: center;
  width: 300px;
`;

const Label = styled.span`
  background: #3f3f3f;
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  font-weight: 400;
  color: ${(props: JSX.IntrinsicAttributes) => props.cssProps.accent || '#fff'};
  display: flex;
  flex-direction: row;
  align-items: center;
  text-transform: uppercase;
  font-size: 0.8rem;

  > svg {
    margin-right: 0.25rem;
  }
`;

const CardOverlay = styled.div`
  margin-left: 0.5rem;
  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.25rem;
    width: auto;
    color: #3f3f3f;
    font-weight: 600;
  }
`;

const CharacterItem = styled.div`
  position: relative;
  min-width: 80px;
  min-height: 80px;
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
    background: #3f3f3f;
    color: #fff;
    padding: 0.25rem;
    border-radius: 3px;
    position: absolute;
    bottom: -2rem;
    left: auto;
    right: auto;
    transition: box-shadow ease-in-out 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 1rem;
    color: ${(props: JSX.IntrinsicAttributes) =>
      props.cssProps.owned ? props.cssProps.accent : '#fff'};
  }
`;

const HoverButton = styled.button`
  position: absolute;
  background: #bb3f3f;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  z-index: 2;
  border: none;
  font-size: 30px;
  color: #fff;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const DamageButton = styled(HoverButton)`
  left: -5px;
  top: -5px;
`;

const HealButton = styled(HoverButton)`
  right: -5px;
  top: -5px;
`;

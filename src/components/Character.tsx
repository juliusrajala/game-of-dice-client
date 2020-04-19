import * as React from 'react';
import styled from 'styled-components';
import {
  FiUser,
  FiHeart,
  FiShield,
  FiZap,
  FiPlusCircle,
  FiEye,
  FiFeather,
  FiActivity,
  FiMinusCircle,
  FiList,
} from 'react-icons/fi';
import { Users } from 'src/App';
import SkillMenu from './SkillMenu';
import { setCharacterAttribute } from 'src/core/api';
import Tooltip from './Tooltip';

interface Props {
  character: Character;
}

const Character = (props: Props) => {
  const userContext = React.useContext(Users);
  const { user } = userContext;
  const { character } = props;

  const increaseHp = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    return setCharacterAttribute(
      'damage_taken',
      parseInt(character.damage_taken as any) - 1,
      character.character_id
    ).then(console.log);
  };

  const decreaseHp = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    return setCharacterAttribute(
      'damage_taken',
      parseInt((character.damage_taken as any) || 0) + 1,
      character.character_id
    ).then(console.log);
  };

  const isPlayerCharacter = character.owner_id === user.user_id;
  return (
    <CharacterContainer>
      <CharacterInfo>
        <Tooltip label={character.character_name}>
          <CharacterName>{character.character_name}</CharacterName>
        </Tooltip>
        <CharacterItem
          cssProps={{
            accent: character.accent_color,
            owned: isPlayerCharacter,
          }}
        >
          {user.is_admin ||
            (isPlayerCharacter && (
              <>
                <DamageButton onClick={decreaseHp}>
                  <FiMinusCircle />
                </DamageButton>
                <HealButton onClick={increaseHp}>
                  <FiPlusCircle />
                </HealButton>
              </>
            ))}
          <IconContainer>
            <IconImg src="/assets/images/portrait-elf.png" />
          </IconContainer>
        </CharacterItem>
        <HitPoints cssProps={{ accent: character.accent_color }}>
          <FiHeart />
          {character.hit_points - character.damage_taken} /{' '}
          {character.hit_points}
        </HitPoints>
      </CharacterInfo>
      <SkillList cssProps={{ accent: character.accent_color }}>
        <SkillMenu character={character} valueKey="hit_points">
          <Label cssProps={{ accent: character.accent_color }}>
            <FiHeart />
            hp
          </Label>
        </SkillMenu>
        <br />
        <SkillMenu character={character} valueKey="armor_class">
          <Label cssProps={{ accent: character.accent_color }}>
            <FiShield />
            ac
          </Label>
        </SkillMenu>
        <SkillMenu character={character} valueKey="attack_bonus">
          <Label cssProps={{ accent: character.accent_color }}>
            <FiZap />
            ab
          </Label>
        </SkillMenu>
        <br />
        <SkillMenu character={character} valueKey="fortitude">
          <Label cssProps={{ accent: character.accent_color }}>
            <FiActivity />
            Fo
          </Label>
        </SkillMenu>
        <SkillMenu character={character} valueKey="reflex">
          <Label cssProps={{ accent: character.accent_color }}>
            <FiFeather />
            Re
          </Label>
        </SkillMenu>
        <SkillMenu character={character} valueKey="will">
          <Label cssProps={{ accent: character.accent_color }}>
            <FiEye />
            Wi
          </Label>
        </SkillMenu>
      </SkillList>
      <SkillList cssProps={{ accent: props.character.accent_color }}>
        <SkillMenu character={character} valueKey="initiative">
          <Label cssProps={{ accent: character.accent_color }}>
            <FiList />
            In
          </Label>
        </SkillMenu>
      </SkillList>
    </CharacterContainer>
  );
};

export default Character;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0.5rem;
  width: 300px;
  align-items: flex-start;
  justify-content: center;
`;

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CharacterName = styled.h3`
  font-weight: 600;
  font-size: 1.2rem;
  color: #3f3f3f;
  padding: 0rem 0.25rem 0.5rem;
  overflow: hidden;
  max-width: 150px;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const HitPoints = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background: #3f3f3f;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.25rem;
  margin: 0.25rem;
  border-radius: 5px;
  transition: box-shadow ease-in-out 0.2s;
  font-size: 1rem;
  font-weight: 800;
  color: ${(props: JSX.IntrinsicAttributes) => props.cssProps.accent || '#fff'};
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  svg {
    margin-right: 0.5rem;
  }
`;

const Label = styled.div`
  background: #3f3f3f;
  padding: 0.125rem 0.25rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  font-weight: 400;
  color: ${(props: JSX.IntrinsicAttributes) => props.cssProps.accent || '#fff'};
  text-transform: uppercase;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  svg {
    margin-right: 0.25rem;
  }
`;

const SkillList = styled.div`
  margin-left: 0.25rem;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;

  > br {
    flex: 1;
  }

  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.125rem;
    width: auto;
    color: #3f3f3f;
    font-weight: 600;
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
  box-shadow: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.owned
      ? '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
      : '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'};
  color: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.accent || '#0fbcf9'};
  cursor: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.owned ? 'pointer' : 'default'};
  background: #3f3f3f;
  border: 3px solid
    ${(props: JSX.IntrinsicAttributes) =>
      props.cssProps.owned ? props.cssProps.accent : 'transparent'};
  > svg {
    font-size: 40px;
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

const IconImg = styled.img`
  height: 80px;
  width: 80px;
  margin-bottom: -10px;
`;

const IconContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

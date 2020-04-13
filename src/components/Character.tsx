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
} from 'react-icons/fi';
import { Users } from 'src/App';
import SkillMenu from './SkillMenu';

interface Props {
  character: Character;
}
const Character = (props: Props) => {
  const userContext = React.useContext(Users);
  const { user } = userContext;
  const { character } = props;

  const isPlayerCharacter = character.owner_id === user.user_id;
  return (
    <CharacterContainer>
      <CharacterInfo>
        <h3>{character.character_name}</h3>
        <CharacterItem
          cssProps={{
            accent: character.accent_color,
            owned: isPlayerCharacter,
          }}
        >
          {user.is_admin ||
            (isPlayerCharacter && (
              <>
                <DamageButton>
                  <FiMinusCircle />
                </DamageButton>
                <HealButton>
                  <FiPlusCircle />
                </HealButton>
              </>
            ))}
          <FiUser />
        </CharacterItem>
        <HitPoints cssProps={{ accent: character.accent_color }}>
          <FiHeart />
          {character.hit_points - character.damage_taken} /{' '}
          {character.hit_points}
        </HitPoints>
      </CharacterInfo>
      <CardOverlay cssProps={{ accent: character.accent_color }}>
        <SkillMenu character={character} valueKey="hit_points">
          <Label cssProps={{ accent: character.accent_color }}>
            <FiHeart />
            hp
          </Label>
        </SkillMenu>
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
      </CardOverlay>
      <CardOverlay cssProps={{ accent: props.character.accent_color }}>
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
      </CardOverlay>
    </CharacterContainer>
  );
};

export default Character;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0.5rem;
  width: 300px;
  align-items: center;
  justify-content: center;
`;

const CharacterInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > h3 {
    color: #3f3f3f;
    padding: 0.25rem;
    top: -2rem;
  }
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

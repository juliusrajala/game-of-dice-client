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
} from 'react-icons/fi';
import { Users } from 'src/App';
import Input from './Input';
import Button from './Button';
import { setCharacterAttribute } from 'src/core/api';

interface Props {
  character: Character;
}

interface InputProps {
  children: any;
  valueKey: string;
  character: Character;
  isPlayerCharacter: boolean;
}

const InputPrompt = (props: InputProps) => {
  const [inputValue, setValue] = React.useState(
    props.character[props.valueKey]
  );
  const [displayInput, toggleDisplay] = React.useState(false);

  const submitNewValue = (ev) => {
    if (!props.isPlayerCharacter) {
      return;
    }
    ev.preventDefault();
    ev.stopPropagation();
    return setCharacterAttribute(
      props.valueKey,
      inputValue,
      props.character.character_id
    ).then(() => toggleDisplay(false));
  };

  return (
    <Label cssProps={{ accent: props.character.accent_color }}>
      {displayInput && (
        <InputHolder>
          <Input
            label={props.children}
            inputProps={{ defaultValue: inputValue, autoFocus: true }}
            onChange={(ev) => setValue(parseInt(ev.target.value))}
          />
          <Button onClick={submitNewValue} label="Save value" />
        </InputHolder>
      )}
      <span
        onClick={() => props.isPlayerCharacter && toggleDisplay(!displayInput)}
      >
        {props.children}
      </span>
    </Label>
  );
};

const Character = (props: Props) => {
  const userContext = React.useContext(Users);
  const { user } = userContext;
  const { character } = props;

  const isPlayerCharacter = character.owner_id === user.user_id;
  return (
    <CharacterContainer>
      <CharacterItem
        cssProps={{
          accent: character.accent_color,
          owned: isPlayerCharacter,
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
        <h3>{character.character_name}</h3>
      </CharacterItem>
      <CardOverlay cssProps={{ accent: props.character.accent_color }}>
        <span>
          <InputPrompt
            character={character}
            isPlayerCharacter={isPlayerCharacter}
            valueKey="hit_points"
          >
            <FiHeart />
            hp
          </InputPrompt>
          {character.hit_points - (character.damage_taken || 0)}/
          {character.hit_points}
        </span>
        <span>
          <InputPrompt
            character={character}
            isPlayerCharacter={isPlayerCharacter}
            valueKey="armor_class"
          >
            <FiShield />
            ac
          </InputPrompt>
          {character.armor_class}
        </span>
        <span>
          <InputPrompt
            character={character}
            isPlayerCharacter={isPlayerCharacter}
            valueKey="attack_bonus"
          >
            <FiZap />
            ab
          </InputPrompt>
          +{character.attack_bonus}
        </span>
      </CardOverlay>
      <CardOverlay cssProps={{ accent: props.character.accent_color }}>
        <span>
          <InputPrompt
            character={character}
            isPlayerCharacter={isPlayerCharacter}
            valueKey="fortitude"
          >
            <FiActivity />
            Fo
          </InputPrompt>
          {character.fortitude}
        </span>
        <span>
          <InputPrompt
            character={character}
            isPlayerCharacter={isPlayerCharacter}
            valueKey="reflex"
          >
            <FiFeather />
            Re
          </InputPrompt>
          {character.reflex}
        </span>
        <span>
          <InputPrompt
            character={character}
            isPlayerCharacter={isPlayerCharacter}
            valueKey="will"
          >
            <FiEye />
            Wi
          </InputPrompt>
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
  padding: 1.5rem 0.5rem;
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
  text-transform: uppercase;
  font-size: 0.8rem;
  position: relative;

  cursor: pointer;

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

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

const InputHolder = styled.div`
  padding: 0.5rem;
  border-radius: 5px;
  position: absolute;
  left: 20px;
  top: 20px;
  background: #3f3f3f;
  z-index: 3;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

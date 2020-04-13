import * as React from 'react';
import styled from 'styled-components';
import { FiEdit, FiSave, FiShuffle } from 'react-icons/fi';
import { Users } from 'src/App';
import Input from './Input';
import Button from './Button';
import { setCharacterAttribute } from 'src/core/api';

interface Props {
  children: any;
  valueKey: string;
  character: Character;
}

const SkillMenu = (props: Props) => {
  const userContext = React.useContext(Users);
  const { character, valueKey } = props;
  const { user } = userContext;
  const canEdit = user.user_id === character.owner_id;

  const [displayMenu, toggleDisplay] = React.useState(false);
  const [showEdit, toggleEdit] = React.useState(false);

  const [inputValue, setValue] = React.useState(character[valueKey]);

  const submitNewValue = (ev) => {
    if (!canEdit) {
      return;
    }
    ev.preventDefault();
    ev.stopPropagation();
    return setCharacterAttribute(
      valueKey,
      inputValue,
      character.character_id
    ).then(() => toggleDisplay(false));
  };

  return (
    <SkillMenuContainer>
      {displayMenu && (
        <MenuHolder>
          <Actions>
            <ActionButton>
              <FiShuffle />
            </ActionButton>
            <ActionButton onClick={() => canEdit && toggleEdit(!showEdit)}>
              <FiEdit />
            </ActionButton>
          </Actions>
          {showEdit && (
            <>
              <Input
                label={props.children}
                inputProps={{ defaultValue: inputValue, autoFocus: true }}
                onChange={(ev) => setValue(parseInt(ev.target.value))}
              />
              <Button
                onClick={submitNewValue}
                label={
                  <>
                    <FiSave />
                    Save value
                  </>
                }
              />
            </>
          )}
        </MenuHolder>
      )}
      <CursorTarget
        cssProps={{ canEdit, displayMenu }}
        onClick={() => canEdit && toggleDisplay(!displayMenu)}
      >
        {props.children}
        <span>{character[valueKey]}</span>
      </CursorTarget>
    </SkillMenuContainer>
  );
};

export default SkillMenu;

const SkillMenuContainer = styled.div`
  padding: 0;
  margin: 0;
  position: relative;
  margin: 0.25rem;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  > * {
    margin: 0rem 0.5rem;
  }
`;

const ActionButton = styled.button`
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
  border: none;
  font-size: 30px;
  color: #fff;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const CursorTarget = styled.span`
  cursor: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.canEdit ? 'pointer' : 'default'};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.displayMenu &&
    `
    > div {
      transition: transform .2s ease-in-out;
      z-index: 3;
      transform: scale(1.5);
  }

  `}
`;

const MenuHolder = styled.div`
  margin-top: -1rem;
  padding: 0.5rem;
  border-radius: 5px;
  position: absolute;
  left: 100%;
  top: 0;
  background: #3f3f3f;
  z-index: 3;
  box-shadow: 100px 100px 100px 100vw rgba(255, 255, 255, 0.5);
`;

import * as React from 'react';
import styled from 'styled-components';
import {
  FiZap,
  FiHeart,
  FiShield,
  FiUser,
  FiFilePlus,
  FiX,
  FiEye,
  FiFeather,
  FiActivity,
} from 'react-icons/fi';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { createCharacter } from 'src/core/api';

interface Props {
  character?: Character;
  toggleForm: () => void;
}

const initialCharacter = {
  character_name: '',
  hit_points: 0,
  armor_class: 0,
  attack_bonus: 0,
  reflex: 0,
  will: 0,
  fortitude: 0,
};

const CharacterForm = (props: Props) => {
  const [formData, setValue] = React.useState<Partial<Character>>(
    props.character || initialCharacter
  );

  const submitData = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (formData.character_name) {
      createCharacter(formData).then(props.toggleForm);
    }
  };

  return (
    <Form>
      <Input
        label={
          <>
            <FiUser />
            Name
          </>
        }
        inputProps={{ autoFocus: true, defaultValue: formData.character_name }}
        onChange={(ev) =>
          setValue({ ...formData, character_name: ev.target.value })
        }
      />
      <FormColumn>
        <Input
          label={
            <>
              <FiHeart />
              Hit Points (Total)
            </>
          }
          inputProps={{ type: 'number', defaultValue: formData.hit_points }}
          onChange={(ev) =>
            setValue({ ...formData, hit_points: parseInt(ev.target.value) })
          }
        />
        <Input
          label={
            <>
              <FiShield />
              Armor Class
            </>
          }
          inputProps={{ type: 'number', defaultValue: formData.armor_class }}
          onChange={(ev) =>
            setValue({ ...formData, armor_class: parseInt(ev.target.value) })
          }
        />
        <Input
          label={
            <>
              <FiZap />
              Attack Bonus
            </>
          }
          inputProps={{ type: 'number', defaultValue: formData.attack_bonus }}
          onChange={(ev) =>
            setValue({ ...formData, attack_bonus: parseInt(ev.target.value) })
          }
        />
      </FormColumn>
      <FormColumn>
        <Input
          label={
            <>
              <FiActivity />
              Fortitude Save
            </>
          }
          inputProps={{ type: 'number', defaultValue: formData.fortitude }}
          onChange={(ev) =>
            setValue({ ...formData, fortitude: parseInt(ev.target.value) })
          }
        />
        <Input
          label={
            <>
              <FiFeather />
              Reflex Save
            </>
          }
          inputProps={{ type: 'number', defaultValue: formData.reflex }}
          onChange={(ev) =>
            setValue({ ...formData, reflex: parseInt(ev.target.value) })
          }
        />
        <Input
          label={
            <>
              <FiEye />
              Will Save
            </>
          }
          inputProps={{ type: 'number', defaultValue: formData.will }}
          onChange={(ev) =>
            setValue({ ...formData, will: parseInt(ev.target.value) })
          }
        />
      </FormColumn>
      <FormActions>
        <Button
          onClick={props.toggleForm}
          label={
            <>
              <FiX /> Cancel
            </>
          }
        />
        <Button
          onClick={submitData}
          label={
            <>
              <FiFilePlus /> Create character
            </>
          }
        />
      </FormActions>
    </Form>
  );
};

export default CharacterForm;

const Form = styled.form``;
const FormColumn = styled.div`
  width: 150px;
  display: inline-block;
  margin-right: 1rem;
`;

const FormActions = styled.div`
  display: flex;
  flex-direction: row;

  > button {
  }
`;

import * as React from 'react';
import styled from 'styled-components';
import { FiZap, FiHeart, FiShield, FiUser, FiFilePlus } from 'react-icons/fi';
import Input from 'src/components/Input';
import Button from 'src/components/Button';
import { createCharacter } from 'src/core/api';

interface Props {
  character?: Character;
}

const CharacterForm = (props: Props) => {
  const [formData, setValue] = React.useState<Partial<Character>>(
    props.character || null
  );

  const submitData = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (formData.character_name) {
      console.log('Creating characte', JSON.stringify(formData));
      createCharacter(formData);
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
        inputProps={{ autoFocus: true }}
        onChange={(ev) =>
          setValue({ ...formData, character_name: ev.target.value })
        }
      />

      <Input
        label={
          <>
            <FiHeart />
            Hit Points
          </>
        }
        inputProps={{ type: 'number' }}
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
        inputProps={{ type: 'number' }}
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
        inputProps={{ type: 'number' }}
        onChange={(ev) =>
          setValue({ ...formData, attack_bonus: parseInt(ev.target.value) })
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
    </Form>
  );
};

export default CharacterForm;

const Form = styled.form``;

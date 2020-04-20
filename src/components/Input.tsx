import * as React from 'react';
import styled from 'styled-components';

interface Props {
  label: string | React.ReactNode;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: Props) => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <InputEl onChange={props.onChange} {...props.inputProps} />
    </Container>
  );
};

export default Input;

const Container = styled.label`
  display: flex;
  max-width: 300px;
  flex-direction: column;
  margin: 0.5rem 0rem;
`;

// There's a better typing to this that I can't bet bothered to set together
// it needs to be used to allow for setting the inputProps.
const InputEl: any = styled.input`
  background: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1.1rem;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > svg {
    margin-right: 0.5rem;
  }
`;

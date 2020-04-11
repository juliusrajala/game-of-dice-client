import * as React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  inputProps?: React.HTMLProps<HTMLInputElement>;
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const Component = (props: Props) => {
  return (
    <Container>
      <Label>{props.label}</Label>
      <Input onChange={props.onChange} {...props.inputProps} />
    </Container>
  );
};

export default Component;

const Container = styled.label`
  display: flex;
  max-width: 300px;
  flex-direction: column;
  margin: 0.5rem 0rem;
`;

// There's a better typing to this that I can't bet bothered to set together
// it needs to be used to allow for setting the inputProps.
const Input: any = styled.input`
  background: #fff;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem;
`;

const Label = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
`;

import * as React from 'react';
import styled from 'styled-components';

interface Props {
  onClick: (ev: React.SyntheticEvent<HTMLButtonElement>) => void;
  label: any;
}

const Button = (props: Props) => {
  return <ButtonWrapper onClick={props.onClick}>{props.label}</ButtonWrapper>;
};

export default Button;

const ButtonWrapper = styled.button`
  background: #bb3f3f;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 150px;
  margin-top: 1rem;
  font-size: 1rem;

  svg {
    margin-right: 0.5rem;
  }

  &:hover,
  &:focus {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

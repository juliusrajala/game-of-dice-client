import * as React from 'react';
import styled from 'styled-components';

interface Props {
  onClick: (ev: React.SyntheticEvent<HTMLButtonElement>) => void;
  label: any;
  disabled?: boolean;
}

const Button = (props: Props) => {
  return (
    <ButtonWrapper onClick={(ev) => !props.disabled && props.onClick(ev)}>
      {props.label}
    </ButtonWrapper>
  );
};

export default Button;

const ButtonWrapper = styled.button`
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

  background: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps && props.cssProps.disabled ? '#f5f5f5' : '#bb3f3f'};
  > a,
  * {
    color: ${(props: JSX.IntrinsicAttributes) =>
      props.cssProps && props.cssProps.disabled ? '#2f2f2f' : '#fff'};
  }

  svg {
    margin-right: 0.5rem;
  }

  a {
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  &:hover,
  &:focus {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

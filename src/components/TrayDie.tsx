import * as React from 'react';
import styled from 'styled-components';
import { FiTrash } from 'react-icons/fi';

interface Props {
  deleteFn: (id: string) => void;
  clickFn: (id: string) => void;
  dieItem: Die;
}

const TrayDie = (props: Props) => {
  return (
    <StyledDie key={props.dieItem.id}>
      <span>{props.dieItem.type}</span>
      <DeleteButton onClick={() => props.deleteFn(props.dieItem.id)}>
        <FiTrash color="#fff" />
      </DeleteButton>
      <span>{props.dieItem.value || ''}</span>
    </StyledDie>
  );
};

export default TrayDie;

export const StyledDie = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  border: 4px solid #fff;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  background: transparent;
  margin-right: 0.75rem;
  margin-top: 0.75rem;
  flex-direction: column;
  position: relative;
  z-index: 1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  & > button {
    display: none;
  }

  &:hover > button {
    display: inline-block;
  }

  &:first-child {
    margin-left: 0;
  }

  > * {
    margin: 0.25rem;
    font-weight: 300;
  }

  > span:first-child {
    position: absolute;
    left: 5px;
    top: 5px;
    font-size: 0.8rem;
    font-weight: 400;
  }

  > span:last-child {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  background: #bb3f3f;
  width: 30px;
  height: 30px;
  right: -15px;
  top: -15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  z-index: 2;
  border: none;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

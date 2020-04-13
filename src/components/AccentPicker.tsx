import * as React from 'react';
import styled from 'styled-components';
import { setUserColor } from 'src/core/api';

const colors = [
  '#ef5777',
  '#ff5e57',
  '#ffd32a',
  '#05c46b',
  '#00d8d6',
  '#808e9b',
  '#ffdd59',
  '#ea8685',
  '#778beb',
  '#f3a683',
  '#f8a5c2',
  '#e77f67',
];

const AccentPicker = () => {
  return (
    <Palette>
      <Label>Pick your accent:</Label>
      {colors.map((item) => (
        <PaletteItem
          key={item}
          cssProps={{ color: item }}
          onClick={() => setUserColor(item)}
        />
      ))}
    </Palette>
  );
};

export default AccentPicker;

const Palette = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * {
    margin-right: 0.5rem;
  }
`;

const Label = styled.h3`
  font-weight: 600;
`;

const PaletteItem = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 4px;
  background: ${(props: JSX.IntrinsicAttributes) => props.cssProps.color};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover,
  &:focus {
    transform: translateY(-2px);
  }
`;

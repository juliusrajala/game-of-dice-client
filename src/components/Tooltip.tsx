import * as React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  children: React.ReactChild;
}

const Tooltip = (props: Props) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  return (
    <Container
      onMouseEnter={() => !showTooltip && setShowTooltip(true)}
      onMouseLeave={() => showTooltip && setShowTooltip(false)}
    >
      {showTooltip && <Tip>{props.label}</Tip>}
      {props.children}
    </Container>
  );
};

export default Tooltip;

const Container = styled.div`
  margin: none;
  padding: none;
  height: auto;
  width: auto;
  display: flex;
  position: relative;
`;

const Tip = styled.div`
  padding: 0.25rem;
  background: #fff;
  color: black;
  position: absolute;
  border-radius: 3px;
  z-index: 3;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
`;

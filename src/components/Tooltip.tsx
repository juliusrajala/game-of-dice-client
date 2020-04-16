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
  padding: 0.5rem;
  background: #fff;
  color: black;
  position: absolute;
`;

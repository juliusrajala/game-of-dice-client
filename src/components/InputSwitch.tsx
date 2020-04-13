import * as React from 'react';
import styled from 'styled-components';

interface Props {
  toggle: (toggled?: boolean) => void;
  isToggled: boolean;
  label: string;
}

const InputSwitch = (props: Props) => {
  return (
    <SliderContainer>
      <h5>{props.label}:</h5>
      <Slider cssProps={{ isToggled: props.isToggled }}>
        <input
          onChange={() => props.toggle()}
          onClick={() => props.toggle()}
          type="checkbox"
        />
        <SliderIndicator cssProps={{ isToggled: props.isToggled }} />
      </Slider>
    </SliderContainer>
  );
};

export default InputSwitch;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 400;
  font-size: 1.1rem;
  color: #fff;
`;

const Slider = styled.div`
  margin-left: 0.5rem;
  border: 2px solid;
  border-color: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.isToggled ? '#05c46b' : '#d2dae2'};
  position: relative;
  width: 60px;
  line-height: 0;
  padding: 0;
  height: 30px;
  border-radius: 15px;
  z-index: 1;

  > input {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    width: 60px;
    border: 1px red solid;
    color: red;
    position: absolute;
    z-index: 3;
    opacity: 0;
    &:focus ~ span {
      transition: all 0s;
      outline: 5px double #bb3f3f;
      outline-offset: 5px;
    }
  }

  > h5 {
    color: #fff;
    top: -20px;
    line-height: 1;
    display: block;
    width: auto;
  }
`;

const SliderIndicator = styled.span`
  height: 30px;
  width: 30px;
  background: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.isToggled ? '#05c46b' : '#d2dae2'};
  margin-top: -2px;
  border-radius: 15px;
  position: absolute;
  transition: left ease-in-out 0.25s;
  left: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.isToggled ? '30px' : '-1px'};
  top: 0;
  line-height: 0;
  z-index: 2;
`;

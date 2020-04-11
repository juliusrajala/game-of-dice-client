import * as React from 'react';
import { ulid } from 'ulid';
import styled from 'styled-components';
import { FiShuffle, FiXSquare } from 'react-icons/fi';
import { castGroupedDice } from 'src/core/dice';
import TrayDie, { StyledDie } from 'src/components/TrayDie';
import { postRollEvent } from 'src/core/api';
import InputSwitch from 'src/components/InputSwitch';

const defaultDice: DieType[] = [
  'd2',
  'd3',
  'd4',
  'd6',
  'd8',
  'd10',
  'd12',
  'd100',
];

interface DiceState {
  dice: Die[];
}

const initialDiceState: DiceState = {
  dice: [],
};

const newDie = (type: DieType): Die => ({
  type,
  id: ulid(),
  value: null,
});

const DiceControl = () => {
  const [diceState, setDiceState] = React.useState(initialDiceState);
  const [isOnline, setOnline] = React.useState(true);

  const addDice = (dieType: DieType) => {
    setDiceState({
      dice: diceState.dice.concat(newDie(dieType)),
    });
  };

  const castDice = () => {
    const newDice = castGroupedDice(diceState.dice);
    setDiceState({ dice: newDice });
    if (!isOnline || newDice.length === 0) {
      return;
    }
    return postRollEvent(newDice);
  };

  const removeDie = (id: string) => {
    const newDice = diceState.dice.filter((item) => item.id !== id);
    setDiceState({ dice: newDice });
  };

  const allDieCast =
    diceState.dice.length > 0 &&
    diceState.dice.reduce((acc, next) => (!acc ? acc : !!next.value), true);

  return (
    <DiceContainer>
      <OnlineControl>
        <InputSwitch
          label="Deliver"
          isToggled={isOnline}
          toggle={() => setOnline(!isOnline)}
        />
      </OnlineControl>
      <DieTable>
        <ToolLabel>Dice tray</ToolLabel>
      </DieTable>
      <div>
        <DieTable>
          {diceState.dice.map((item) => (
            <TrayDie
              dieItem={item}
              key={item.id}
              deleteFn={removeDie}
              clickFn={console.log}
            />
          ))}
          {diceState.dice.length === 0 && (
            <PlaceHolder>Select dice to cast below.</PlaceHolder>
          )}
          {allDieCast && (
            <StyledDie>
              <span>Total:</span>
              <span>
                {diceState.dice.reduce((acc, next) => acc + next.value, 0)}
              </span>
            </StyledDie>
          )}
        </DieTable>
      </div>
      <div>
        <ToolLabel>Add dice</ToolLabel>
        <DieTable>
          {defaultDice.map((die) => (
            <DieButton key={die} onClick={() => addDice(die)}>
              {die}
            </DieButton>
          ))}
        </DieTable>
      </div>
      <DieTable>
        <ControlButton onClick={castDice}>
          <FiShuffle /> Cast dice
        </ControlButton>
        <ControlButton onClick={() => setDiceState(initialDiceState)}>
          <FiXSquare />
          Reset dice
        </ControlButton>
      </DieTable>
    </DiceContainer>
  );
};

export default DiceControl;

const OnlineControl = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding-top: 1rem;
`;

const DieButton = styled.button`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 3px solid #fff;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  background: transparent;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    background: rgba(255, 255, 255, 0.1);
  }
  &:first-child {
    margin-left: 0;
  }
`;

const DieTable = styled.div`
  padding: 1rem 0rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  > * {
    margin-right: 0.5rem;
  }
`;

const ToolLabel = styled.h2`
  color: #fff;
  font-size: 1.5rem;
`;

const PlaceHolder = styled.div`
  font-size: 1.3rem;
  font-weight: 300;
  color: #777;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  margin-top: 0.75rem;
`;

const DiceContainer = styled.div`
  position: relative;
  background: #3f3f3f;
  padding: 1rem;
  flex: 2;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const ControlButton = styled.div`
  background: #bb3f3f;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  padding: 0.5rem;
  margin: 0.25rem;
  color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

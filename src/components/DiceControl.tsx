import * as React from 'react';
import { ulid } from 'ulid';
import { castGroupedDice } from 'src/core/dice';
import styled from 'styled-components';

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

const Die = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 3px solid #fff;
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0.25rem;
  flex-direction: column;
  position: relative;

  > * {
    margin: 0.25rem;
    font-weight: 300;
  }

  > span:first-child {
    position: absolute;
    left: 5px;
    top: 5px;
    font-sise: 0.9rem;
  }

  > span:last-child {
    font-size: 2rem;
    font-weight: 600;
  }
`;

const AddDie = styled.button`
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
  margin: 0.25rem;
  background: transparent;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const DieTable = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ToolLabel = styled.h2`
  color: #fff;
  font-size: 1.5rem;
`;

const DiceContainer = styled.div`
  background: #3f3f3f;
  padding: 1rem;
  flex: 2;
  height: 100%;
`;

const DiceControl = () => {
  const [diceState, setDiceState] = React.useState(initialDiceState);

  const addDice = (dieType: DieType) => {
    setDiceState({
      dice: diceState.dice.concat(newDie(dieType)),
    });
  };

  const castDice = () => {
    setDiceState({ dice: castGroupedDice(diceState.dice) });
  };
  console.log(diceState);
  return (
    <DiceContainer>
      <ToolLabel>Grabbed dice</ToolLabel>
      <div>
        <DieTable>
          {diceState.dice.map((item) => (
            <Die key={item.id}>
              <span>{item.type}</span>
              <span>{item.value || ''}</span>
            </Die>
          ))}
          <Die>
            <span>Total:</span>
            <span>
              {diceState.dice.reduce((acc, next) => acc + next.value, 0)}
            </span>
          </Die>
        </DieTable>
        <AddDie onClick={castDice}>Cast dice</AddDie>
      </div>
      <div>
        <ToolLabel>Add dice</ToolLabel>
        <DieTable>
          <AddDie onClick={() => addDice('d2')}>d2</AddDie>
          <AddDie onClick={() => addDice('d4')}>d4</AddDie>
          <AddDie onClick={() => addDice('d6')}>d6</AddDie>
          <AddDie onClick={() => addDice('d8')}>d8</AddDie>
          <AddDie onClick={() => addDice('d10')}>d10</AddDie>
          <AddDie onClick={() => addDice('d12')}>d12</AddDie>
          <AddDie onClick={() => addDice('d100')}>d100</AddDie>
        </DieTable>
      </div>
    </DiceContainer>
  );
};

export default DiceControl;

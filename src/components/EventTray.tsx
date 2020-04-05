import * as React from 'react';
import { ulid } from 'ulid';
import { getDieValue } from 'src/core/dice';
import styled from 'styled-components';
import { format } from 'date-fns';

const events: Array<DiceEvent> = [
  {
    event_id: ulid(),
    event_type: 'dice',
    timestamp: Date.now(),
    description: 'Dice cast',
    rolls: [
      {
        id: ulid(),
        value: getDieValue(12),
        type: 'd12',
      },
      {
        id: ulid(),
        value: getDieValue(6),
        type: 'd6',
      },
    ],
    creator: 'Julius',
  },
  {
    event_id: ulid(),
    event_type: 'dice',
    timestamp: Date.now(),
    description: 'Dice cast',
    rolls: [
      {
        id: ulid(),
        value: getDieValue(12),
        type: 'd12',
      },
    ],
    creator: 'Konsta',
  },
];

const EventContainer = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  flex: 1;
  height: 100%;
`;

const Title = styled.h2`
  font-weight: 300;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Event = styled.div`
  padding: 0.5rem;

  > h3 {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.8rem;
  }
`;

const EventDice = styled.span`
  font-weight: 400;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
`;

const Die = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border: 3px solid #3f3f3f;
  color: #3f3f3f;
  font-weight: 600;
  text-transform: uppercase;
  margin: 0.25rem;
  flex-direction: column;
  position: relative;

  > * {
  }

  > span:first-child {
    position: absolute;
    left: 3px;
    top: 3px;
    font-size: 0.5rem;
  }

  > span:last-child {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const EventTray = () => {
  return (
    <EventContainer>
      <Title>What happened:</Title>
      <div>
        {events.map((item) => (
          <Event key={item.event_id}>
            <h3>
              {item.description} - {format(item.timestamp, 'HH.mm.ss')}
            </h3>
            {item.rolls.length > 0 && (
              <EventDice>
                {item.rolls.map((roll) => (
                  <Die>
                    <span>{roll.type}</span>
                    <span>{roll.value}</span>
                  </Die>
                ))}
              </EventDice>
            )}
          </Event>
        ))}
      </div>
    </EventContainer>
  );
};

export default EventTray;

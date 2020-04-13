import * as React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';

interface Props {
  event: DiceEvent;
  index: number;
}

const DiceEvent = (props: Props) => {
  const { event, index } = props;
  return (
    <Event
      cssProps={{ index, accent: event.accent_color }}
      key={event.event_id}
    >
      <h3>
        {format(parseInt(event.timestamp as string), 'HH.mm')} / Dice event /{' '}
        <span>{event.player_name}</span>
      </h3>
      {event.rolls && event.rolls.length > 0 && (
        <EventDice cssProps={{ index, accent: event.accent_color }}>
          {event.rolls.map((roll) => (
            <Die key={roll.id}>
              <span>{roll.type}</span>
              <span>{roll.value}</span>
            </Die>
          ))}
        </EventDice>
      )}
      <p>{event.description}</p>
    </Event>
  );
};

export default DiceEvent;

const EventDice = styled.span`
  font-weight: 400;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  > * {
    background: ${(props: JSX.IntrinsicAttributes) =>
      props.cssProps.accent || 'transparent'};
  }
`;

const Event = styled.div`
  padding: 0.5rem;
  opacity: ${(props: JSX.IntrinsicAttributes) =>
    Math.max(1 - props.cssProps.index * 0.05, 0.5)};

  &:not(:last-child) {
    border-bottom: 2px solid rgba(0, 0, 0, 0.05);
  }

  &:hover {
    opacity: 1;
  }

  > h3 {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.8rem;
    display: inline-block;
    padding: 0.125rem;
    border-bottom: 2px solid;
    border-color: ${(props: JSX.IntrinsicAttributes) =>
      props.cssProps.accent || 'transparent'};
  }

  > span:last-child {
    text-align: right;
    width: 100%;
    display: block;
    font-size: 0.9rem;
    font-weight: 400;
  }
  > p {
    font-weight: 600;
    font-size: 0.9rem;
    padding-top: 0.5rem;
  }
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
  margin-right: 0.5rem;
  margin-top: 0.25rem;
  flex-direction: column;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > span:first-child {
    position: absolute;
    left: 3px;
    top: 3px;
    font-size: 0.6rem;
  }

  > span:last-child {
    font-size: 1.5rem;
  }
`;

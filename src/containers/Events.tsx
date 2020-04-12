import * as React from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import { useSocket } from 'src/hooks/socket';
import { useRequestedData } from 'src/hooks/http';
import { getEvents } from 'src/core/api';

function getEventType(event: DndEvent) {
  switch (event.event_type) {
    case 'dice_event':
      return 'Dice cast';
    default:
      return 'Something happened';
  }
}

const EventTray = () => {
  const { message, connected } = useSocket();
  const [events, setEvents] = React.useState([]);
  const [requestState] = useRequestedData<DndEvent[]>(getEvents(), 'getEvents');

  React.useEffect(() => {
    if (requestState.status === 'fulfilled') {
      setEvents(requestState.data);
    }
  }, [requestState]);

  React.useEffect(() => {
    if (message) {
      setEvents([message, ...events]);
    }
  }, [message]);

  return (
    <EventContainer>
      <Title>Last events:</Title>
      <ConnectionIndicator cssProps={{ connected }} />
      <EventList>
        {events.map((item, idx) => (
          <Event
            cssProps={{ index: idx, accent: item.accent_color }}
            key={item.event_id}
          >
            <h3>
              {getEventType(item)} @ {format(parseInt(item.timestamp), 'HH.mm')}
            </h3>
            {item.rolls.length > 0 && (
              <EventDice cssProps={{ index: idx, accent: item.accent_color }}>
                {item.rolls.map((roll) => (
                  <Die key={roll.id}>
                    <span>{roll.type}</span>
                    <span>{roll.value}</span>
                  </Die>
                ))}
              </EventDice>
            )}
            <span>By {item.player_name}</span>
          </Event>
        ))}
      </EventList>
    </EventContainer>
  );
};

export default EventTray;

const EventList = styled.div`
  overflow: auto;
  flex: 1;
  max-height: 600;
`;

const ConnectionIndicator = styled.span`
  content: '';
  position: absolute;
  height: 30px;
  width: 30px;
  top: 1rem;
  right: 1rem;
  background: ${(props: JSX.IntrinsicAttributes) =>
    props.cssProps.connected ? '#05c46b' : '#ff3f34'};
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  z-index: 2;
`;

const EventContainer = styled.section`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.9);
  flex: 1;
  border-radius: 5px;
  margin-left: 1rem;
  height: auto;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: auto;
`;

const Title = styled.h2`
  font-weight: 300;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Event = styled.div`
  padding: 0.5rem;
  opacity: ${(props: JSX.IntrinsicAttributes) =>
    1 - props.cssProps.index * 0.1};

  &:hover {
    opacity: 1;
  }

  > h3 {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.8rem;
  }

  > span:last-child {
    text-align: right;
    width: 100%;
    display: block;
    font-size: 0.9rem;
    font-weight: 400;
  }
`;

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

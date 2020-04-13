import * as React from 'react';
import styled from 'styled-components';
import { Sockets } from 'src/core/socket';
import { useRequestedData } from 'src/hooks/http';
import { getEvents } from 'src/core/api';
import DiceEvent from 'src/components/DiceEvent';

function getEvent(event: DiceEvent, idx: number) {
  switch (event.event_type) {
    case 'dice_event':
      return <DiceEvent event={event} index={idx} />;
    default:
      return 'Something happened';
  }
}

const EventTray = () => {
  const { message, connected } = React.useContext(Sockets);
  const [events, setEvents] = React.useState([]);
  const [requestState] = useRequestedData<DndEvent[]>(getEvents(), 'getEvents');

  React.useEffect(() => {
    if (requestState.status === 'fulfilled') {
      setEvents(requestState.data);
    }
  }, [requestState]);

  React.useEffect(() => {
    if (message && message.event_type === 'dice_event') {
      setEvents([message, ...events]);
    }
  }, [message]);

  return (
    <EventContainer>
      <Title>Last events:</Title>
      <ConnectionIndicator cssProps={{ connected }} />
      <EventList>{events.map((item, idx) => getEvent(item, idx))}</EventList>
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

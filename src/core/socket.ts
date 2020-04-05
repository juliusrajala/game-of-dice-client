import * as React from 'react';
import { ulid } from 'ulid';
import * as io from 'socket.io-client';

export function useSockets() {
  const [socketClient, setSocket] = React.useState<SocketIOClient.Socket>(null);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (!socketClient) {
      const socket = io.connect('ws://localhost:3001');

      socket.on('connect', () => {});

      socket.on('message', (data) => {
        console.log('Message received', data);
      });
      setSocket(socket);
    }

    return () => {
      if (socketClient) {
        socketClient.disconnect();
      }
    };
  }, []);

  function sendMessage(data: any, eventType: EventType = 'dice_event') {
    switch (eventType) {
      case 'dice_event':
        return socketClient.send(
          JSON.stringify({
            event_type: eventType,
            creator: ulid(),
            description: 'Cast dice',
            rolls: data,
          })
        );
      default:
        return;
    }
  }

  return { messages, sendMessage };
}

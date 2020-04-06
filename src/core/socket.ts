import * as React from 'react';
import { ulid } from 'ulid';
import * as io from 'socket.io-client';

export function useSockets() {
  const [socketClient, setSocket] = React.useState<SocketIOClient.Socket>(null);
  const [messageHolder, pushMessage] = React.useState(null);

  React.useEffect(() => {
    console.log('Messages', messageHolder);
    if (!socketClient) {
      const socket = io.connect('ws://localhost:3001');

      socket.on('connect', () => {});

      socket.on('message', (data) => {
        pushMessage(data);
      });
      setSocket(socket);
    }

    return () => {
      if (socketClient) {
        socketClient.disconnect();
      }
    };
  }, []);

  return messageHolder;
}

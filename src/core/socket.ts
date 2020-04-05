import * as React from 'react';
import { ulid } from 'ulid';
import * as io from 'socket.io-client';

export function useSockets() {
  const [socketClient, setSocket] = React.useState<SocketIOClient.Socket>(null);
  const [message, setMessage] = React.useState();

  React.useEffect(() => {
    console.log('Messages', message);
    if (!socketClient) {
      const socket = io.connect('ws://localhost:3001');

      socket.on('connect', () => {});

      socket.on('message', (data) => {
        setMessage(data);
      });
      setSocket(socket);
    }

    return () => {
      if (socketClient) {
        socketClient.disconnect();
      }
    };
  }, []);

  return message;
}

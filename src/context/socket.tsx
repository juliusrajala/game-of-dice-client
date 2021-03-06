import * as React from 'react';
import * as io from 'socket.io-client';

export function useSocket() {
  const [socketClient, setSocket] = React.useState<SocketIOClient.Socket>(null);
  const [message, pushMessage] = React.useState(null);
  const [connected, setConnected] = React.useState(false);

  React.useEffect(() => {
    console.log('Messages', message);
    if (!socketClient) {
      const socket = io.connect(
        `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${
          process.env.api_url
        }`
      );

      socket.on('connect', () => {
        console.log('Connected to server.');
        setConnected(true);
      });

      socket.on('message', (data) => {
        console.log('Message received', data);
        pushMessage(data);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server.');
        setConnected(false);
      });
      setSocket(socket);
    }

    return () => {
      if (socketClient) {
        socketClient.disconnect();
      }
    };
  }, []);

  return { message: message, connected: connected };
}

interface SocketContext {
  message: any;
  connected: boolean;
}

export const Sockets = React.createContext<SocketContext>({
  message: null,
  connected: false,
});

export const SocketProvider: React.SFC = (props) => {
  const [freshMessage, setMessage] = React.useState([]);
  const { message, connected } = useSocket();

  React.useEffect(() => {
    if (message) {
      setMessage(message);
    }
  }, [message]);

  return (
    <Sockets.Provider
      value={{
        message: freshMessage,
        connected,
      }}
    >
      {props.children}
    </Sockets.Provider>
  );
};

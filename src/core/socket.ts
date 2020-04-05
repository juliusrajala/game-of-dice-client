import * as React from 'react';
import { ulid } from 'ulid';

export function useSockets() {
  const [socket, setSocket] = React.useState<WebSocket>(null);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    if (!socket) {
      const webSocket = new WebSocket('ws://localhost:3001/');
      webSocket.addEventListener('open', (ev: Event) => {
        console.log(ev);
        webSocket.send(`Connecting as ${ulid()}`);
      });

      webSocket.addEventListener('message', (ev: WebSocketMessageEvent) => {
        console.log('data');
        setMessages([...messages, ev.data]);
        return webSocket.send('Message received.');
      });

      setSocket(webSocket);
    }

    return () => {
      if (socket) {
        socket.removeEventListener('open', () => {});
        socket.removeEventListener('message', () => {});
      }
    };
  }, []);

  function sendMessage(data: any, eventType: EventType = 'dice_event') {
    switch (eventType) {
      case 'dice_event':
        return socket.send(
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

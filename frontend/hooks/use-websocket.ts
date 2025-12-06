
import { useEffect, useRef, useState } from 'react';

export function useWebSocket(url: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Only connect if url is valid
    if (!url) return;

    console.log('Connecting to WebSocket:', url);
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket Connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      console.log('WebSocket Message:', event.data);
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
      } catch (e) {
        setLastMessage(event.data);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket Disconnected');
      setIsConnected(false);
    };

    socket.onerror = (error) => {
        console.error('WebSocket Error:', error);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { isConnected, lastMessage, socket: socketRef.current };
}

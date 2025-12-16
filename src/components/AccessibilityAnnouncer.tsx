import { useEffect, useState } from 'react';

interface AccessibilityAnnouncerProps {
  message: string;
  assertive?: boolean;
}

export function AccessibilityAnnouncer({ message, assertive = false }: AccessibilityAnnouncerProps) {
  const [announced, setAnnounced] = useState('');

  useEffect(() => {
    if (message) {
      // Clear first to ensure re-announcement of same message
      setAnnounced('');
      const timeout = setTimeout(() => setAnnounced(message), 100);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <div
      role="status"
      aria-live={assertive ? 'assertive' : 'polite'}
      aria-atomic="true"
      className="sr-only"
    >
      {announced}
    </div>
  );
}

import * as React from 'react';

export function useStoredUser() {
  const [storedUserId, setStoredUserId] = React.useState(null);
  React.useEffect(() => {
    const locallyStored = localStorage.getItem('godUserId');
    if (locallyStored) {
      setStoredUserId(locallyStored);
    }
  }, []);

  return storedUserId;
}

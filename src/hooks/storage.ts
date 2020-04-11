import * as React from 'react';

export function useStoredUser() {
  const [storedUserId, setStoredUserId] = React.useState(null);
  console.log('Stored user', storedUserId);
  React.useEffect(() => {
    const locallyStored = localStorage.getItem('godUserId');
    if (locallyStored) {
      setStoredUserId(locallyStored);
    }
  }, []);

  return storedUserId;
}

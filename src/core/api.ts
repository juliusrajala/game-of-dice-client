const apiBase = 'http://localhost:3001/api/v1';

export const sendDiceRoll = (dice: Die[], description: string = '') => {
  return fetch(`${apiBase}/create/roll`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      rolls: dice,
      creator_id: 'Julius',
      description: description,
    }),
  });
};

const apiBase = 'http://localhost:3001/api/v1';

export const postRollEvent = (dice: Die[], description: string = '') => {
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

export const postNewUser = (name, email) => {
  return fetch(`${apiBase}/create/roll`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.id) {
        // This is how we persist users, I guess.
        localStorage.setItem('godUserId', result.id);
      }
      return result;
    })
    .catch(console.error);
};

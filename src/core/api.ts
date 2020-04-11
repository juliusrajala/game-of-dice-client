const apiBase = `http://${process.env.api_url}/api/v1`;

export const postRollEvent = (dice: Die[], description: string = '') => {
  const userId = localStorage.getItem('godUserId');
  return fetch(`${apiBase}/create/roll`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      rolls: dice,
      creator_id: userId,
      description: description,
    }),
  });
};

export const getEvents = () => {
  return fetch(`${apiBase}/events`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then((response) => response.json())
    .catch(console.error);
};

export const postNewUser = (name, email) => {
  return fetch(`${apiBase}/user/create`, {
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
    .then((result: User) => {
      if (result.user_id) {
        // This is how we persist users, I guess.
        localStorage.setItem('godUserId', result.user_id);
      }
      return result;
    })
    .catch(console.error);
};

export const getUser = (id) => {
  return fetch(`${apiBase}/user`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      id,
    }),
  })
    .then((response) => response.json())
    .then((result: User) => {
      if (result.user_id) {
        // This is how we persist users, I guess.
        localStorage.setItem('godUserId', result.user_id);
      }
      return result;
    })
    .catch(console.error);
};

const apiBase = `http://${process.env.api_url}/api/v1`;

const statusHandler = (response: Response) => {
  return response.json().then((result) => {
    if (response.status === 404) {
      throw new Error('Not found!');
    }

    if (response.status === 400) {
      throw new Error(`Request is of bad format, ${result.message}`);
    }

    if (response.status === 500) {
      throw new Error(`Internal server error: ${JSON.stringify(result)}`);
    }
    if (response.ok) {
      return result;
    }
  });
};

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
    .then(statusHandler)
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
    .then(statusHandler)

    .then((result: User) => {
      if (result.user_id) {
        // This is how we persist users, I guess.
        localStorage.setItem('godUserId', result.user_id);
      }
      return result;
    });
};

export const loginUser = (name, email) => {
  return fetch(`${apiBase}/user/login`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      name,
      email,
    }),
  })
    .then(statusHandler)

    .then((result: User) => {
      console.log('Result of login', result);
      if (result.user_id) {
        // This is how we persist users, I guess.
        localStorage.setItem('godUserId', result.user_id);
      }
      return result;
    });
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
    .then(statusHandler)
    .then((result: User) => {
      if (result.user_id) {
        // This is how we persist users, I guess.
        localStorage.setItem('godUserId', result.user_id);
      }
      return result;
    })
    .catch((err) => new Error(err));
};

export const getCharacters = () => {
  return fetch(`${apiBase}/characters`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'GET',
  })
    .then(statusHandler)
    .catch(console.error);
};

export const createCharacter = (data: Partial<Character>) => {
  const userId = localStorage.getItem('godUserId');
  return fetch(`${apiBase}/characters/create`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      ...data,
      owner_id: userId,
    }),
  })
    .then(statusHandler)
    .catch(console.error);
};

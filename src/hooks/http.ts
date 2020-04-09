import * as React from 'react';

interface RequestState<T> {
  status: HttpRequestStatus;
  data: T | null;
  error: Error | null;
}

type RequestDataSource<T> = [RequestState<T>, () => void];

const initialState: RequestState<any> = {
  status: '',
  error: null,
  data: null,
};

export function useRequestedData<T>(
  fetcher: Promise<T | void>
): RequestDataSource<T> {
  const [state, setState] = React.useState<RequestState<T>>(initialState);

  React.useEffect(() => {
    if (state.status === '') {
      setState({ ...state, status: 'pending' });
      Promise.resolve(fetcher)
        .then((result: T) =>
          setState({
            status: 'fulfilled',
            data: result,
            error: null,
          })
        )
        .catch((err) =>
          setState({
            status: 'rejected',
            data: null,
            error: err,
          })
        );
    }
  }, []);

  // Returns a request-state and a function to reset the request for a retry.
  return [state, () => setState(initialState)];
}

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

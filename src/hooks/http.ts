import * as React from 'react';

interface RequestState<T> {
  status: HttpRequestStatus;
  data: T | null;
  error: Error | null;
  requestId?: string;
}

type RequestDataSource<T> = [RequestState<T>, () => void];

const initialState: RequestState<any> = {
  status: '',
  error: null,
  data: null,
};

export function useRequestedData<T>(
  fetcher: Promise<T | void>,
  requestId?: string
): RequestDataSource<T> {
  const [state, setState] = React.useState<RequestState<T>>({
    ...initialState,
    requestId,
  });

  React.useEffect(() => {
    if (state.status === '') {
      setState({ ...state, status: 'pending' });
      Promise.resolve(fetcher)
        .then((result: T) =>
          setState({
            ...state,
            status: 'fulfilled',
            data: result,
          })
        )
        .catch((err) =>
          setState({
            ...state,
            status: 'rejected',
            error: err,
          })
        );
    }
  }, []);

  // Returns a request-state and a function to reset the request for a retry.
  return [state, () => setState(initialState)];
}

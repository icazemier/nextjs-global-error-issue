"use client";
import {
  Dispatch,
  useContext,
  useEffect,
  useState,
  createContext,
  SetStateAction,
  ReactNode,
} from "react";

type UseErrorState = [
  Error | undefined,
  Dispatch<SetStateAction<Error | undefined>>
];

const ErrorCatcherContext = createContext<UseErrorState>(
  [] as unknown as UseErrorState
);

export function useErrorContext() {
  return useContext(ErrorCatcherContext);
}

export function ErrorCatchProvider({ children }: { children: ReactNode }) {
  const useErrorState = useState<Error | undefined>();
  const [errorState, setErrorState] = useErrorState;

  // throw errors if caught
  useEffect(() => {
    if (errorState) {
      throw errorState;
    }
  }, [errorState]);

  useEffect(() => {
    const unhandledRejectionListener = (event: PromiseRejectionEvent) => {
      setErrorState(event.reason);
      event.preventDefault();
    };
    const errorListener = (event: ErrorEvent) => {
      setErrorState(event.error);
      event.preventDefault();
    };

    window.addEventListener("unhandledrejection", unhandledRejectionListener, {
      capture: true,
    });
    window.addEventListener("error", errorListener);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        unhandledRejectionListener
      );
      window.removeEventListener("error", errorListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorCatcherContext.Provider value={useErrorState}>
      {children}
    </ErrorCatcherContext.Provider>
  );
}

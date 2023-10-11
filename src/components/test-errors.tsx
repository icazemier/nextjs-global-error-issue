"use client";

import { useErrorContext } from "./error-catch-provider";

export default function TestErrors() {
  const [, setErrorState] = useErrorContext();

  const delayedError = async () => {
    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Delayed Error Thrown!"));
      }, 2000);
    });
  };

  const onButtonClick = () => {
    throw new Error("Whoopsie!");
  };

  const onButton2Click = async () => {
    await delayedError();
  };

  const onButton3Click = async () => {
    setTimeout(() => {
      throw new Error("Whoops");
    }, 2000);
  };

  const onButton4Click = async () => {
    try {
      await delayedError();
    } catch (error) {
      setErrorState(error);
    }
  };

  return (
    <div>
      <p>
        <button onClick={onButtonClick}>ERROR sync error!</button>
      </p>
      <p>
        <button onClick={onButton2Click}>ERROR delayedError!</button>
      </p>
      <p>
        <button onClick={onButton3Click}>ERROR delayed async Error!</button>
      </p>
      <p>
        <button onClick={onButton4Click}>
          ERROR delayed async Error use state ourselves!
        </button>
      </p>
    </div>
  );
}

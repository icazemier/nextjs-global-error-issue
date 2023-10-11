"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  return (
    <html>
      <body>
        <h2>{"Something went wrong (Global Error Boundary)!"}</h2>

        <h2>Error message:</h2>
        <p>{error.message}</p>

        <h2>Details:</h2>
        <p>{error.stack?.toString()}</p>

        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

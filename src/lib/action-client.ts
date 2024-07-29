import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient({
  handleReturnedServerError: (error) => {
    return error.name === "PWAError" ? error.message : error instanceof Error ? error.message : "An error occurred";
  }
});

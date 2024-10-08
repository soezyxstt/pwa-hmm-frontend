import {redirect} from 'next/navigation';

export class PWAError extends Error {
  constructor(message: string) {
    super(message.includes('(PWAError)') ? message : message + '(PWAError)');
    this.name = "PWAError";
  }
}

export async function handleError(err: { message: string, errorCode: string } | any) {
  if (err.errorCode === 'LMS3003') {
    return redirect('/sign-out');
  }

  throw new PWAError(err.message);
}
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pathFormatter = (path: string) => {
  return path.toLowerCase().replace(' ', '-');
};

export function extractFirstSegment(input: string) {
  // Remove the leading slash if present
  if (input.startsWith('/')) {
    input = input.slice(1);
  }

  // Find the index of the first slash
  const slashIndex = input.indexOf('/');

  // Extract the segment before the first slash
  const firstSegment = slashIndex !== -1 ? input.slice(0, slashIndex) : input;

  return firstSegment;
}

export const getTokenFromResponse = (res: Response) => {
  const set_cookies = res.headers.get('set-cookie')?.split('=');
  const access_token = set_cookies?.[1].split(';')[0];
  const refresh_token = set_cookies?.[5].split(';')[0];
  const max_age = set_cookies?.[6].split(';')[0];

  return { access_token, refresh_token, max_age };
};

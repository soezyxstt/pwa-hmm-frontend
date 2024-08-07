import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pathFormatter = (path: string) => {
  return path.toLowerCase().replace(' ', '-');
};

export const getTokenFromResponse = (res: Response) => {
  const set_cookies = res.headers.get('set-cookie')?.split('=');
  const access_token = set_cookies?.[1].split(';')[0];
  const refresh_token = set_cookies?.[5].split(';')[0];
  const expire = new Date(Date.parse(set_cookies?.[8].split(';')[0]!));

  return { access_token, refresh_token, expire };
};

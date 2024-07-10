import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
  const firstSegment =
    slashIndex !== -1 ? input.slice(0, slashIndex) : input;

  return firstSegment;
}
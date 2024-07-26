export class PWAError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PWAError';
  }
}
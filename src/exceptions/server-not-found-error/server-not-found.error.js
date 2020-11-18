export default class ServerUnavailable extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = 'ServerUnavailable';
  }
}

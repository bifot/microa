class Client {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    this.events[event] = callback;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const client = new Client();

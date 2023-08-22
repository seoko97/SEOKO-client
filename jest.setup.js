import "@testing-library/jest-dom";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }
}

global.localStorage = new LocalStorageMock();

const originalError = console.error;

global.console.error = jest.fn((...args) => {
  if (typeof args[0] === "string" && args[0].includes("should be wrapped into act")) {
    return;
  }

  return originalError.call(console, args);
});

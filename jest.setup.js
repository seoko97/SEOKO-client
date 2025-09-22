import "@testing-library/jest-dom";

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] ?? null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  clear() {
    this.store = {};
  }

  removeItem(key) {
    delete this.store[key];
  }
}

Object.defineProperty(global, "localStorage", {
  value: new LocalStorageMock(),
});

const originalError = console.error;

Object.defineProperty(global.console, "error", {
  value: (...args) => {
    if (typeof args[0] === "string" && args[0].includes("should be wrapped into act")) {
      return;
    }

    originalError.call(console, args);
  },
});

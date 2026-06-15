/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

/**
 * Safe storage wrapper to prevent crash in cross-origin iframes where localStorage access is denied.
 */
class SafeStorage {
  private memoryStore: Record<string, string> = {};
  private available = false;

  constructor() {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const testKey = "__storage_test__";
        window.localStorage.setItem(testKey, testKey);
        window.localStorage.removeItem(testKey);
        this.available = true;
      }
    } catch (e) {
      this.available = false;
      console.warn("localStorage is not accessible in this context. Falling back to in-memory storage.", e);
    }
  }

  getItem(key: string): string | null {
    if (this.available) {
      try {
        return window.localStorage.getItem(key);
      } catch (e) {
        // fallback
      }
    }
    return this.memoryStore[key] !== undefined ? this.memoryStore[key] : null;
  }

  setItem(key: string, value: string): void {
    if (this.available) {
      try {
        window.localStorage.setItem(key, value);
        return;
      } catch (e) {
        // fallback
      }
    }
    this.memoryStore[key] = value;
  }

  removeItem(key: string): void {
    if (this.available) {
      try {
        window.localStorage.removeItem(key);
        return;
      } catch (e) {
        // fallback
      }
    }
    delete this.memoryStore[key];
  }
}

export const safeStorage = new SafeStorage();

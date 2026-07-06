const DB_NAME = 'AuraCacheDB';
const STORE_NAME = 'keyval';
const DB_VERSION = 1;

function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };
    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export const dbCache = {
  async get(key: string): Promise<any> {
    try {
      const db = await getDB();
      return new Promise((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(key);
        request.onsuccess = () => {
          resolve(request.result);
        };
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (err) {
      console.warn(`IndexedDB get failed for key "${key}", falling back to localStorage:`, err);
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : null;
      } catch (_) {
        return null;
      }
    }
  },

  async set(key: string, value: any): Promise<void> {
    try {
      const db = await getDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.put(value, key);
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (err) {
      console.warn(`IndexedDB set failed for key "${key}", falling back to localStorage:`, err);
      try {
        const strVal = JSON.stringify(value);
        if (strVal.length < 100000) { // Limit localStorage fallback to tiny data sizes
          localStorage.setItem(key, strVal);
        }
      } catch (_) {}
    }
  },

  async delete(key: string): Promise<void> {
    try {
      const db = await getDB();
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(key);
        request.onsuccess = () => {
          resolve();
        };
        request.onerror = () => {
          reject(request.error);
        };
      });
    } catch (err) {
      console.warn(`IndexedDB delete failed for key "${key}":`, err);
      try {
        localStorage.removeItem(key);
      } catch (_) {}
    }
  }
};

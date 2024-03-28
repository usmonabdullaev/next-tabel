import { Item, Data } from "@/types";

const sumStorage: {
  init: () => number;
} = {
  init: () => {
    const storage = localStorage.getItem("data");
    if (!storage) {
      localStorage.setItem("data", JSON.stringify([]));
      return 0;
    }
    const data: Data = JSON.parse(storage);
    if (!data.length) return 0;
    const balances = data.map((i) => i.balance);
    const result = balances.reduce((a, b) => a + b);
    return result;
  },
};

const dataStorage: {
  init: () => Data;
  add: (d: Item) => Data;
  delete: (_id: string) => Data;
  get: (_id: string) => Item;
} = {
  init: () => {
    const data = localStorage.getItem("data");
    if (!data) {
      localStorage.setItem("data", JSON.stringify([]));
      return [];
    }
    return JSON.parse(data);
  },
  add: (d) => {
    const storage = localStorage.getItem("data");
    if (!storage) return dataStorage.init();
    const data: Data = JSON.parse(storage);

    data.push(d);
    localStorage.setItem("data", JSON.stringify(data));
    return data;
  },
  delete: (_id) => {
    const storage = localStorage.getItem("data");
    if (!storage) return dataStorage.init();
    const data: Data = JSON.parse(storage);
    const filteredData: Data = data.filter((i) => i._id !== _id);
    localStorage.setItem("data", JSON.stringify(filteredData));
    return filteredData;
  },
  get: (_id: string) => {
    const data = localStorage.getItem("data");
    if (!data) {
      localStorage.setItem("data", JSON.stringify([]));
      return [];
    }
    const filtered = JSON.parse(data).find((i: Item) => i._id === _id);
    return filtered;
  },
};

export { dataStorage, sumStorage };

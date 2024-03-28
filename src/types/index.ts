type Item = {
  _id: string;
  balance: number;
  date: string;
  state: "PLUS" | "MINUS";
};

type Data = Item[];

interface FetchDataItem extends Item {
  id: number;
}

type FetchData = FetchDataItem[];

type SyncPropsType = {
  _id: string;
};

export type { Item, Data, FetchData, FetchDataItem, SyncPropsType };

"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import { dataStorage } from "@/localStorage";
import { FetchData, SyncPropsType } from "@/types";

const Sync = ({ _id }: SyncPropsType) => {
  const [data, setData] = useState<FetchData>([]);
  const [sync, setSync] = useState(false);
  const url = "https://3c7f082f9a0c8f54.mokky.dev/items";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const responseData = response.data;
        setData(responseData);
      } catch {}
    };
    fetchData();
  }, [sync]);

  const ids = data.map((i) => i._id);

  const syncData = async () => {
    try {
      const storageData = dataStorage.get(_id);
      await axios.post(url, storageData).then((res) => {
        if (res.status === 201) setSync(!sync);
      });
    } catch {}
  };

  return (
    <div>
      {ids.includes(_id) ? (
        <p>Синхронизировано</p>
      ) : (
        <p onClick={syncData} className="cursor-pointer">
          Синхронизироват
        </p>
      )}
    </div>
  );
};

export default Sync;

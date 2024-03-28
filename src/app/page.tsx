"use client";

import { useEffect, useState, JSX } from "react";
import axios from "axios";

import { dataStorage, sumStorage } from "@/localStorage";
import { Data } from "@/types";
import AddForm from "@/components/AddForm";
import Sync from "@/components/Sync";

const Home = (): JSX.Element => {
  const [balance, setBalance] = useState<number>();
  const [data, setData] = useState<Data>();
  const url = "https://3c7f082f9a0c8f54.mokky.dev/items";

  const initData = () => {
    const b = sumStorage.init();
    const d = dataStorage.init();
    setBalance(b);
    setData(d);
  };

  const deleteItem = async (_id: string) => {
    if (window.confirm("DELETE ITEM")) {
      let id;
      await axios.get(`${url}?_id=${_id}`).then((res) => {
        if (res.data.length) {
          id = res.data[0].id;
        }
      });
      if (!id) {
        dataStorage.delete(_id);
        initData();
      } else {
        await axios.delete(`${url}/${id}`).then((res) => {
          if (res.status === 200) {
            dataStorage.delete(_id);
            initData();
          } else {
            alert("DONE");
          }
        });
      }
    }
  };

  useEffect(initData, []);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between max-w-[90%] h-16 mx-auto">
        <h1>Abdullaev Usmon</h1>
        <p>{balance || balance === 0 ? balance : "Loading..."}</p>
      </div>
      <div className="flex flex-col gap-4 max-w-screen-sm w-full mx-auto items-center">
        {data
          ? data.map((i) => (
              <div
                key={i._id}
                className={`flex items-center justify-between w-full py-1 px-6 rounded text-white ${
                  i.state === "PLUS" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                <div className="flex items-center gap-2">
                  <p>{i.date}</p>
                  <p
                    onClick={() => deleteItem(i._id)}
                    className="cursor-pointer hover:text-black"
                  >
                    DELETE
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Sync _id={i._id} />
                  <p>
                    {i.state === "PLUS" ? "+" : ""}
                    {i.balance}
                  </p>
                </div>
              </div>
            ))
          : "Loading..."}
      </div>
      <AddForm initData={initData} />
    </div>
  );
};

export default Home;

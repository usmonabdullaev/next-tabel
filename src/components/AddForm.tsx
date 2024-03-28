import { LegacyRef, useRef, useState } from "react";

import uniqueId from "@/lib/uniqueId";
import { Item } from "@/types";
import formatDate from "@/lib/formatDate";
import { dataStorage } from "@/localStorage";

const AddForm = ({ initData }: { initData: () => void }) => {
  const [nextStep, setNextStep] = useState(false);
  const [value, setValue] = useState("");

  const validateValue = (): boolean => {
    let result;
    value !== "" &&
    (value[0] === "+" || value[0] === "-") &&
    value.length >= 2 &&
    Number(value)
      ? (result = false)
      : (result = true);
    return result;
  };

  const addTask = () => {
    const data: Item = {
      _id: uniqueId(),
      date: formatDate(new Date()),
      state: value[0] === "+" ? "PLUS" : "MINUS",
      balance: Number(value),
    };
    dataStorage.add(data);
    initData();
    setNextStep(false);
    setValue("");
  };

  return (
    <div className="flex justify-center mt-4">
      {nextStep ? (
        <div className="max-w-screen-sm w-full flex justify-between rounded py-1 px-6 bg-gray-300">
          <button
            onClick={() => setNextStep(false)}
            className="rounded bg-red-600 hover:bg-red-500 text-white p-2"
          >
            CLOSE
          </button>
          <input
            autoFocus
            type="text"
            value={value}
            onInput={(e: any) => setValue(e.target.value)}
            className="bg-gray-100 rounded indent-2 outline-none font-medium text-base"
            placeholder="+99 or -99"
          />
          <button
            onClick={addTask}
            className="text-white rounded bg-blue-600 hover:bg-blue-500 disabled:hover:bg-gray-500 disabled:bg-gray-500 p-2"
            disabled={validateValue()}
          >
            ADD
          </button>
        </div>
      ) : (
        <div
          onClick={() => setNextStep(true)}
          className="max-w-screen-sm w-full flex justify-center rounded py-1 bg-gray-300 hover:bg-gray-400 cursor-pointer"
        >
          <h2>NEW</h2>
        </div>
      )}
    </div>
  );
};

export default AddForm;

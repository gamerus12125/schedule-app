"use client";
import axios from "axios";
import { FC } from "react";
import { useState, useEffect } from "react";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import classNames from "classnames";
import Input from "../ui/Input/Input";
import { lesson } from "@prisma/client";
import RedactWindow from "../RedactWindow/RedactWindow";
type weekNamesType = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string
  0: string
};

const TablePage: FC = () => {
  const [data, setData] = useState<[lesson]>();
  const [modal, setModal] = useState(false);
  const [isError, setError] = useState(false);
  const [redactItem, setRedactItem] = useState<number | null>(-1)

  useEffect(() => {
    //    axios
    //      .get(
    //        `${
    //          process.env.NEXT_PUBLIC_DB_URL
    //            ? process.env.NEXT_PUBLIC_DB_URL
    //            : "https://x3j8812v-4200.euw.devtunnels.ms/"
    //        }tables`
    //      )
    //      .then((resp) => resp.data ? setData(resp.data) : "")
    //      .catch((error) => setError(true));
    axios
      .get("/api/tables")
      .then((res) => setData(res.data.data))
      .catch((error) => setError(true));
  }, []);

  const today = new Date();
  const currentDay = today.getDay();

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - currentDay + 1);

  const weekDates = [new Date()];

  for (let i = 0; i < 5; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    weekDates.push(currentDate);
  }
  const weekNames: weekNamesType = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    0: "Воскресенье"
  };

  let newData: [lesson] | undefined = data;

  return (
    <>
    <RedactWindow day={redactItem} data={data} setOpened={() => setModal(false)} isOpened={modal}/>
      <div
        className={classNames(
          modal ? "blur-md px-5 overflow-y-hidden" : "px-5"
        )}
      >
        <h1 className="text-3xl text-center font-bold my-5">
          Школьное расписание и домашнее задание
        </h1>
        <Button funcClick={redactItem != -1 ? () => setModal(true) : console.log} type="button">
          Редактировать
        </Button>
        {!isError ? (
          <table className="w-full border-4 border-slate-500">
            <thead className="border-b border-b-slate-500">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 border-r border-r-slate-500"
                >
                  День недели
                </th>
                <th scope="col" className="px-6 py-4">
                  Расписание
                </th>
              </tr>
            </thead>
            <tbody>
              {weekDates.map((date) => (
                <tr
                  key={date.getDay()}
                  className="border-b border-b-slate-500 text-center"
                >
                  <td>
                    <div className="flex justify-center">
                    <input type="checkbox" disabled={(redactItem != date.getDay() && redactItem !== -1)} className="w-5 h-5 mr-3" onChange={(e) => redactItem != date.getDay() ? setRedactItem(date.getDay()) : setRedactItem(-1)}/>
                    {weekNames[date.getDay() as keyof weekNamesType]}{" "}
                    {date.getDate()}
                    </div>
                  </td>
                  <td>
                    <table className="w-full">
                      <thead className="border-b border-l border-b-slate-500 border-l-slate-500">
                        <tr>
                          <th
                            scope="col"
                            className="w-96 border-r border-r-slate-500"
                          >
                            Урок
                          </th>
                          <th scope="col">Задание</th>
                        </tr>
                      </thead>
                      <tbody className="border-l border-l-slate-500">
                        {data ? (
                          data.map((item) =>
                            item.day === date.getDay() ? (
                              <tr className="text-xl" key={item.id}>
                                <td className="text-center border-r border-r-slate-500">
                                  {item.name}
                                </td>
                                <td className="text-center">{item.homework}</td>
                              </tr>
                            ) : (
                              ""
                            )
                          )
                        ) : (
                          <tr>
                            <td colSpan={2}></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Ошибка</p>
        )}
      </div>
    </>
  );
};

export default TablePage;

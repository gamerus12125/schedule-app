"use client";
import axios from "axios";
import { FC } from "react";
import { useState, useEffect } from "react";
import { table } from "@/types/table";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import classNames from "classnames";
import Input from "../ui/Input/Input";
type weekNamesType = {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
};

const TablePage: FC = () => {
  const [data, setData] = useState<[table]>()
  const [modal, setModal] = useState(false);
  const [redact, setRedact] = useState<any[] | [number]>([]);
  const [isError, setError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `${
          process.env.NEXT_PUBLIC_DB_URL
            ? process.env.NEXT_PUBLIC_DB_URL
            : "https://x3j8812v-4200.euw.devtunnels.ms/"
        }tables`
      )
      .then((resp) => resp.data ? setData(resp.data) : "")
      .catch((error) => setError(true));
  }, []);

  const today = new Date();
  const currentDay = today.getDay();

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - currentDay + 1);

  const weekDates = [];
  console.log(data)

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
  };

  let newData: [table] | undefined = data;

  const changeData = (
    day: number,
    text: string,
    type: string,
    index: number
  ) => {
    if (newData?.find((item) => item.day === day) != undefined) {
      if (type === "homework") {
        newData.find((item) => item.day === day)!.schedule[index].homework =
          text;
      } else {
        newData.find((item) => item.day === day)!.schedule[index].subject =
          text;
      }
    }
  };

  const sendNewData = (day: number) => {
    setRedact((prev) =>
      prev.includes(day) ? prev.filter((itm) => itm != day) : [...prev, day]
    );
    axios.put(`${process.env.NEXT_PUBLIC_DB_URL ? process.env.NEXT_PUBLIC_DB_URL : "https://x3j8812v-4200.euw.devtunnels.ms/"}tables/${day}`, newData![day - 1]);
  };

  return (
    <>
      {modal ? (
        <Modal>
          <h2>Редактирование</h2>
          <p className="py-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            debitis aut dolore eum amet? Voluptas dolor quasi impedit minima ab
            ex consequuntur nobis optio autem quam aperiam, asperiores
            aspernatur minus!
          </p>
          <div className="flex flex-col">
            {!isError ? (
              weekDates.map((day) => (
                <span key={day.getDay()}>
                  {day.getDate()}{" "}
                  {weekNames[day.getDay() as keyof weekNamesType]}
                  {redact.includes(day.getDay()) ? (
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
                            item.day === day.getDay()
                              ? item.schedule.map((sub, index) => (
                                  <tr className="text-xl" key={index}>
                                    <td className="text-center border-r border-r-slate-500">
                                      <Input
                                        type="text"
                                        placeholder=""
                                        required={false}
                                        onChange={(e: any) =>
                                          changeData(
                                            day.getDay(),
                                            e,
                                            "subject",
                                            index
                                          )
                                        }
                                      />
                                    </td>
                                    <td className="text-center">
                                      <Input
                                        type="text"
                                        placeholder=""
                                        required={false}
                                        onChange={(e: any) =>
                                          changeData(
                                            day.getDay(),
                                            e,
                                            "homework",
                                            index
                                          )
                                        }
                                      />
                                    </td>
                                  </tr>
                                ))
                              : ""
                          )
                        ) : (
                          <tr>
                            <td colSpan={2}>Загрузка</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )}
                  <Button
                    funcClick={() =>
                      setRedact((prev) =>
                        prev.includes(day.getDay())
                          ? prev.filter((itm) => itm != day.getDay())
                          : [...prev, day.getDay()]
                      )
                    }
                    type="button"
                  >
                    Редактировать
                  </Button>
                  <Button
                    type="button"
                    funcClick={() => sendNewData(day.getDay())}
                  >
                    Готово
                  </Button>
                </span>
              ))
            ) : (
              <p>Ошибка</p>
            )}
          </div>
          <Button type="button" funcClick={() => setModal(false)}>
            Закрыть
          </Button>
        </Modal>
      ) : (
        ""
      )}
      <div
        className={classNames(
          modal ? "blur-md px-5 overflow-y-hidden" : "px-5"
        )}
      >
        <h1 className="text-3xl text-center font-bold my-5">
          Школьное расписание и домашнее задание
        </h1>
        <Button funcClick={() => setModal(true)} type="button">
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
                    {weekNames[date.getDay() as keyof weekNamesType]}{" "}
                    {date.getDate()}
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
                            item.day === date.getDay()
                              ? item.schedule.map((sub, index) => (
                                  <tr className="text-xl" key={index}>
                                    <td className="text-center border-r border-r-slate-500">
                                      {sub.subject}
                                    </td>
                                    <td className="text-center">
                                      {sub.homework}
                                    </td>
                                  </tr>
                                ))
                              : ""
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

import { lesson } from "@prisma/client";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";
import axios from "axios";

const RedactWindow = ({
  day,
  data,
  setOpened,
}: {
  day: number | null;
  data: lesson[] | undefined;
  setOpened: Function;
}) => {
  const newData = data;
  const sendNewData = () => {
    setOpened();
    axios.put("api/tables", newData);
  };

  return (
    <Modal>
      <h1>Редактирование</h1>
      <table className="my-10 border-slate-500 border-2">
        <thead>
          <tr>
            <th>Урок</th>
            <th>Домашнее задание</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) =>
            item.day === day ? (
              <tr key={index}>
                <td>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder={item.name}
                    onChange={(e) =>
                      newData ? (newData[index].name = e.target.value) : ""
                    }
                  />
                </td>
                <td>
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    placeholder={item.homework}
                    onChange={(e) =>
                      newData ? (newData[index].homework = e.target.value) : ""
                    }
                  />
                </td>
              </tr>
            ) : (
              ""
            )
          )}
        </tbody>
      </table>
      <Button type="button" funcClick={() => sendNewData()}>
        Готово
      </Button>
    </Modal>
  );
};

export default RedactWindow;

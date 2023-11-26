import { lesson } from "@prisma/client";
import Modal from "../ui/Modal/Modal";
import Button from "../ui/Button/Button";
import axios from "axios";

const RedactWindow = ({ day, data, setOpened, isOpened }: { day: number | null, data: [lesson] | undefined, setOpened: Function, isOpened: boolean }) => {

    const newData = data?.filter((item) => item.day === day)
    const sendNewData = () => {
        setOpened()
        axios.put("api/tables", newData)
    }

  return (
    <div className={isOpened ? "" : "hidden"}>
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
            {data?.map((item, index) => item.day === day ? <tr key={index}>
                <td>
                    <input type="text" placeholder={item.name} onChange={(e) => newData ? newData[index - 1].name = e.target.value : ""}/>
                </td>
                <td>
                    <input type="text" placeholder={item.homework} onChange={(e) => newData ? newData[index - 1].homework = e.target.value : ""}/>
                </td>
            </tr> : "")}
        </tbody>
      </table>
      <Button type="button" funcClick={() => sendNewData()}>
        Готово
      </Button>
    </Modal>
    </div>
  );
};

export default RedactWindow;

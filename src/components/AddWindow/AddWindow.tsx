import Button from "@/components/ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import { FormEvent, useState } from "react";
import axios from "axios";

const AddWindow = ({setOpened, day}: {setOpened: Function, day: number}) => {
  const [name, setName] = useState<string>();
  const [homework, setHomework] = useState<string>();

  const addLesson = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpened()
    axios.post("api/tables", {day: day, homework: homework, name: name});
  };

  return (
    <Modal>
      <h2 className="text-2xl text-center">Добавление урока</h2>
      <form onSubmit={(e) => addLesson(e)} className="flex p-5">
        <input
          className="p-3 rounded w-full"
          placeholder="Название"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-3 mx-1 rounded w-full"
          placeholder="Домашнее задание"
          onChange={(e) => setHomework(e.target.value)}
        />
        <Button className="w-full" type="submit">
          Добавить
        </Button>
      </form>
    </Modal>
  );
};

export default AddWindow;

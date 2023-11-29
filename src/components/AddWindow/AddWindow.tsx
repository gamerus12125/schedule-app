import Button from "@/components/ui/Button/Button";
import Modal from "../ui/Modal/Modal";
import { FormEvent, useState } from "react";
import axios from "axios";
import Input from "../ui/Input/Input";

const AddWindow = ({setOpened, day}: {setOpened: Function, day: number}) => {
  const [name, setName] = useState<string>();
  const [homework, setHomework] = useState<string>();

  const addLesson = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post("api/tables", {day: day, homework: homework, name: name});
  };

  return (
    <Modal>
      <h2 className="text-2xl text-center">Добавление урока</h2>
      <form onSubmit={(e) => addLesson(e)} className="flex p-5">
        <Input
          placeholder="Название"
          onChange={setName}
          type="text"
          required
        />
        <Input
          placeholder="Домашнее задание"
          type="text"
          required={false}
          onChange={setHomework}
        />
        <Button className="w-full" type="submit">
          Добавить
        </Button>
      </form>
      <Button type="button" funcClick={() => setOpened()}>
        Закрыть
      </Button>
    </Modal>
  );
};

export default AddWindow;

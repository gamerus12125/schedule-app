import { useState } from "react";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Modal from "../ui/Modal/Modal";
import axios from "axios";
import { useSession } from "next-auth/react";

const AddPost = ({ setVisible }: { setVisible: Function }) => {
  const [title, setTitle] = useState<string>();
  const [text, setText] = useState<string>();
  const user = useSession();
  const createPost = () => {
    setVisible(false)
      const username = user.data?.user?.name;
      axios
        .post("api/posts", { title: title, text: text, username: username })
        .catch((err) => console.error(err));
  };

  return (
    <Modal>
      <h2>Добавление поста</h2>
      <form onSubmit={() => createPost()}>
        <Input
          placeholder="Название"
          type="text"
          required
          onChange={setTitle}
        />
        <Input placeholder="Текст" type="text" required onChange={setText} />
        <Button type="submit">Добавить</Button>
      </form>
    </Modal>
  );
};

export default AddPost;

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import BoardList from "../../components/BoardList";

type JwtPayload = {
  userId: number;
};

const Home = () => {
  const [boards, setBoards] = useState<
    { id: number; title: string; content: string; userId: number }[]
  >([]);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const userId = jwtDecode(localStorage.getItem("token") || "") as JwtPayload;

  const getBoards = async () => {
    const params = {
      offset: 0,
      count: 30,
    };
    const response = await axios.get(
      `http://localhost:3002/boards?offset=${params.offset}&count=${params.count}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setBoards(response.data.boardList);
  };

  const onSubmit = async (data: FieldValues) => {
    const params = {
      title: data.title,
      content: data.content,
      userId: userId.userId,
    };
    await axios.post("http://localhost:3002/boards", params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    getBoards();
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3002/boards/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    getBoards();
  };

  const handleUpdate = async (
    id: number,
    data: { title: string; content: string }
  ) => {
    const params = {
      userId: userId.userId,
      title: data.title,
      content: data.content,
    };
    await axios.patch(`http://localhost:3002/boards/${id}`, params, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    getBoards();
  };

  const logout = async () => {
    await axios.post(
      "http://localhost:3002/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/auth/login");
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} />
          <input {...register("content")} />
          <button type="submit">Write Boards</button>
        </form>
      </div>
      <h1>Boards</h1>
      {boards.map((board) => (
        <BoardList
          key={board.id}
          board={board}
          handleDelete={(id) => handleDelete(id)}
          handleUpdate={(id, data) => handleUpdate(id, data)}
          userId={userId.userId}
        />
      ))}
    </div>
  );
};

export default Home;

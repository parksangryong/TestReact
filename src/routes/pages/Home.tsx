import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import BoardList from "../../components/BoardList";
import FullInput from "../../components/FullInput";
import { PrimaryButton } from "mirr-ui";

type JwtPayload = {
  userId: number;
};

const Home = () => {
  const [boards, setBoards] = useState<
    { id: number; title: string; content: string; userId: number }[]
  >([]);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
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
    reset();
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
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <button
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "30px",
          backgroundColor: "var(--color-primary)",
          color: "white",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          fontSize: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => {
          logout();
        }}
      >
        Logout
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingBottom: "15px",
          marginBottom: "15px",
          borderBottom: "2px solid var(--color-primary)",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <FullInput {...register("title")} placeholder="제목" />
          <FullInput {...register("content")} placeholder="내용" />
          <PrimaryButton theme="social" onClick={handleSubmit(onSubmit)}>
            Write Boards
          </PrimaryButton>
        </form>
      </div>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Boards</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflow: "auto",
          height: "100%",
        }}
      >
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
    </div>
  );
};

export default Home;

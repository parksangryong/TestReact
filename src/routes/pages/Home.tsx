import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import BoardList from "../../components/BoardList";
import FullInput from "../../components/FullInput";
import { PrimaryButton } from "mirr-ui";

import {
  fetchBoardCreate,
  fetchBoardDelete,
  fetchBoardList,
  fetchBoardUpdate,
} from "../../services/api/boardService";
import { fetchLogout } from "../../services/api/authService";
import { getData } from "../../utils/AsyncStorage";
import { USER_ID_KEY } from "../../services/config/config";

const Home = () => {
  const [boards, setBoards] = useState<
    { id: number; title: string; content: string; userId: number }[]
  >([]);
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const userId = getData(USER_ID_KEY)?.idx;

  const getBoards = async () => {
    const params = {
      offset: 0,
      count: 30,
    };
    const response = await fetchBoardList(params);
    setBoards(response.boardList);
  };

  const onSubmit = async (data: FieldValues) => {
    const params = {
      title: data.title,
      content: data.content,
      userId: Number(userId),
    };
    await fetchBoardCreate(params);
    getBoards();
    reset();
  };

  const handleDelete = async (id: number) => {
    await fetchBoardDelete(id);
    getBoards();
  };

  const handleUpdate = async (
    id: number,
    data: { title: string; content: string }
  ) => {
    const params = {
      userId: Number(userId),
      title: data.title,
      content: data.content,
    };
    await fetchBoardUpdate(id, params);
    getBoards();
  };

  const logout = async () => {
    await fetchLogout();
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
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

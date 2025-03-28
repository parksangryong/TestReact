import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FieldValues } from "react-hook-form";
import BoardList from "../../components/BoardList";
import FullInput from "../../components/FullInput";

import {
  fetchBoardCreate,
  fetchBoardList,
} from "../../services/api/boardService";
import { fetchLogout } from "../../services/api/authService";
import { getData } from "../../utils/AsyncStorage";
import { USER_ID_KEY } from "../../services/config/config";
import { FaSignOutAlt } from "react-icons/fa";
import MediumButton from "../../components/MediumButton";

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
        marginBottom: "30px",
        flex: 1,
      }}
    >
      <button
        style={{
          width: "80px",
          height: "40px",
          borderRadius: "30px",
          backgroundColor: "#bb0000",
          color: "white",
          border: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          bottom: "20px",
          right: "20px",
          cursor: "pointer",
        }}
        onClick={() => {
          logout();
        }}
      >
        <FaSignOutAlt size={20} />
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          paddingBottom: "15px",
          marginBottom: "15px",
          borderBottom: "3px dotted #dd0000",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            margin: "30px",
          }}
        >
          <span style={{ fontSize: "14px", fontFamily: "Bungee Inline" }}>
            Write Boards
          </span>
          <FullInput {...register("title")} placeholder="Title" />
          <FullInput {...register("content")} placeholder="Content" />
          <MediumButton theme="primary" onClick={handleSubmit(onSubmit)}>
            Write
          </MediumButton>
        </form>
      </div>
      <h1
        style={{
          fontSize: "15px",
          fontFamily: "Bungee Inline",
          padding: "10px",
        }}
      >
        Boards
      </h1>
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
          <BoardList key={board.id} board={board} />
        ))}
      </div>
    </div>
  );
};

export default Home;

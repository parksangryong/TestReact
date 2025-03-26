import { useState } from "react";
import { useNavigate } from "react-router-dom";
type BoardListProps = {
  board: { id: number; title: string; content: string; userId: number };
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, data: { title: string; content: string }) => void;
};

import { PrimaryButton } from "mirr-ui";
import FullInput from "./FullInput";
import { getData } from "../utils/AsyncStorage";
import { USER_ID_KEY } from "../services/config/config";

const BoardList = ({ board, handleDelete, handleUpdate }: BoardListProps) => {
  const userId = getData(USER_ID_KEY)?.idx;
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateText, setUpdateText] = useState({
    title: board.title,
    content: board.content,
  });
  const navigate = useNavigate();

  return (
    <div
      key={board.id}
      style={{
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "space-between",
          width: "100%",
          padding: "5px 10px",
        }}
      >
        <h2>
          {isUpdate ? (
            <FullInput
              type="text"
              placeholder="제목을 입력하세요"
              value={updateText.title}
              onChange={(e) =>
                setUpdateText({ ...updateText, title: e.target.value })
              }
            />
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
                flex: 1,
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "flex",
                  gap: "10px",
                  flex: 1,
                }}
              >
                {board.id}. {board.title}
              </span>
              <button
                onClick={() => {
                  navigate(`/board/${board.id}`, {
                    state: {
                      title: board.title,
                      content: board.content,
                    },
                  });
                }}
                style={{
                  fontSize: "12px",
                  fontWeight: "regular",
                  backgroundColor: "#695997",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                상세보기
              </button>
            </div>
          )}
        </h2>
        <p>
          {isUpdate ? (
            <FullInput
              type="text"
              placeholder="내용을 입력하세요"
              value={updateText.content}
              onChange={(e) =>
                setUpdateText({ ...updateText, content: e.target.value })
              }
            />
          ) : (
            <span style={{ fontSize: "13px", fontWeight: "regular" }}>
              {board.content}
            </span>
          )}
        </p>
      </div>
      {board.userId === Number(userId) && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "10px",
            flex: 1,
          }}
        >
          {!isUpdate ? (
            <PrimaryButton theme="social" onClick={() => setIsUpdate(true)}>
              Update
            </PrimaryButton>
          ) : (
            <>
              <PrimaryButton
                theme="social"
                onClick={() => {
                  handleUpdate(board.id, updateText);

                  setIsUpdate(false);
                }}
              >
                Save
              </PrimaryButton>
              <PrimaryButton
                theme="dark"
                onClick={() => handleDelete(board.id)}
              >
                Delete
              </PrimaryButton>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardList;

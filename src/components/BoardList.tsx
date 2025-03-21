import { useState } from "react";

type BoardListProps = {
  board: { id: number; title: string; content: string; userId: number };
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, data: { title: string; content: string }) => void;
  userId: number;
};

import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  userId: number;
};

const BoardList = ({ board, handleDelete, handleUpdate }: BoardListProps) => {
  const userId = jwtDecode(localStorage.getItem("token") || "") as JwtPayload;
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateText, setUpdateText] = useState({
    title: board.title,
    content: board.content,
  });

  return (
    <div
      key={board.id}
      style={{
        border: "1px solid black",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center",
      }}
    >
      <h2>
        {isUpdate ? (
          <input
            type="text"
            value={updateText.title}
            onChange={(e) =>
              setUpdateText({ ...updateText, title: e.target.value })
            }
          />
        ) : (
          <>
            {board.id}. {board.title}
          </>
        )}
      </h2>
      <p>
        {isUpdate ? (
          <input
            type="text"
            value={updateText.content}
            onChange={(e) =>
              setUpdateText({ ...updateText, content: e.target.value })
            }
          />
        ) : (
          board.content
        )}
      </p>
      {board.userId === userId.userId && (
        <>
          {!isUpdate ? (
            <button onClick={() => setIsUpdate(true)}>Update</button>
          ) : (
            <>
              <button
                onClick={() => {
                  handleUpdate(board.id, updateText);

                  setIsUpdate(false);
                }}
              >
                Save
              </button>
              <button onClick={() => handleDelete(board.id)}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default BoardList;

import { useState } from "react";
type CommentListProps = {
  comment: {
    id: number;
    content: string;
    userId: number;
    boardId: number;
    username: string;
  };
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, content: string) => void;
};

import FullInput from "./FullInput";
import { getData } from "../utils/AsyncStorage";
import { USER_ID_KEY } from "../services/config/config";
import SmallButton from "./SmallButton";

const CommentList = ({
  comment,
  handleDelete,
  handleUpdate,
}: CommentListProps) => {
  const userId = getData(USER_ID_KEY)?.idx;
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateText, setUpdateText] = useState(comment.content);

  return (
    <div
      key={comment.id}
      style={{
        border: "2px solid #dd0000",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
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
        <div>
          {isUpdate ? (
            <FullInput
              type="text"
              placeholder="내용을 입력하세요"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
            />
          ) : (
            <div
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "space-between",
                padding: "0 10px",
              }}
            >
              <span style={{ fontSize: "14px", fontWeight: "bold" }}>
                {comment.content}
              </span>
              <span style={{ fontSize: "11px", fontWeight: "regular" }}>
                {comment.username}
              </span>
            </div>
          )}
        </div>
      </div>
      {comment.userId === Number(userId) && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "10px",
            flex: 1,
            justifyContent: "flex-end",
            paddingRight: "10px",
          }}
        >
          {!isUpdate ? (
            <SmallButton theme="secondary" onClick={() => setIsUpdate(true)}>
              Update
            </SmallButton>
          ) : (
            <>
              <SmallButton
                theme="secondary"
                onClick={() => {
                  handleUpdate(comment.id, updateText);

                  setIsUpdate(false);
                }}
              >
                Save
              </SmallButton>
              <SmallButton
                theme="tertiary"
                onClick={() => handleDelete(comment.id)}
              >
                Delete
              </SmallButton>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentList;

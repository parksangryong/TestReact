import { useState } from "react";
type CommentListProps = {
  comment: { id: number; content: string; userId: number; boardId: number };
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, content: string) => void;
};

import { PrimaryButton } from "mirr-ui";
import FullInput from "./FullInput";
import { getData } from "../utils/AsyncStorage";
import { USER_ID_KEY } from "../services/config/config";

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
        <p>
          {isUpdate ? (
            <FullInput
              type="text"
              placeholder="내용을 입력하세요"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
            />
          ) : (
            <span style={{ fontSize: "13px", fontWeight: "regular" }}>
              {comment.content}
            </span>
          )}
        </p>
      </div>
      {comment.userId === Number(userId) && (
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
                  handleUpdate(comment.id, updateText);

                  setIsUpdate(false);
                }}
              >
                Save
              </PrimaryButton>
              <PrimaryButton
                theme="dark"
                onClick={() => handleDelete(comment.id)}
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

export default CommentList;

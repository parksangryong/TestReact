import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

// components
import FullInput from "../../components/FullInput";
import CommentList from "../../components/CommentList";
import MediumButton from "../../components/MediumButton";
import SmallButton from "../../components/SmallButton";

// services
import {
  fetchCommentList,
  fetchCommentCreate,
  fetchCommentDelete,
  fetchCommentUpdate,
} from "../../services/api/commentService";

// utils
import { getData } from "../../utils/AsyncStorage";
import { USER_ID_KEY } from "../../services/config/config";

// icons
import { FaLock } from "react-icons/fa";

// hooks
import { useBoardDelete, useBoardUpdate } from "../../hooks/useBoard";

type Comment = {
  id: number;
  content: string;
  userId: number;
  boardId: number;
  username: string;
};

const BoardDetail = () => {
  const { id } = useParams();
  const { title, content, idx } = useLocation().state;
  const [boardData, setBoardData] = useState({
    title: title,
    content: content,
  });
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const userId = getData(USER_ID_KEY)?.idx;

  const { mutateAsync: deleteBoard } = useBoardDelete();
  const { mutateAsync: updateBoard } = useBoardUpdate();

  const handleDelete = async () => {
    await deleteBoard(Number(id));
  };

  const handleUpdate = async () => {
    const params = {
      data: {
        userId: Number(userId),
        title: boardData.title,
        content: boardData.content,
      },
      id: Number(id),
    };
    await updateBoard(params).then(() => {
      setIsUpdate(false);
    });
  };

  const getCommentList = async () => {
    const params = {
      offset: 0,
      count: 10,
      boardId: Number(id),
    };
    const response = await fetchCommentList(params);
    setCommentList(response.commentList);
  };

  const createComment = async () => {
    await fetchCommentCreate({
      boardId: Number(id),
      content: comment,
      userId: Number(userId),
    });
    setComment("");
    getCommentList();
  };

  const deleteComment = async (commentId: number) => {
    await fetchCommentDelete(commentId);
    getCommentList();
  };

  const updateComment = async (commentId: number, content: string) => {
    await fetchCommentUpdate(commentId, {
      content: content,
      userId: Number(userId),
      boardId: Number(id),
    });
    getCommentList();
  };

  useEffect(() => {
    getCommentList();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
        paddingTop: "30px",
      }}
    >
      <div
        style={{
          width: "80%",
          maxHeight: "200px",
          height: "200px",
          overflow: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "10px",
          }}
        >
          {Number(userId) !== idx ? (
            <SmallButton theme="tertiary" disabled>
              <FaLock size={13} />
            </SmallButton>
          ) : (
            <>
              {isUpdate ? (
                <div style={{ display: "flex", gap: 10 }}>
                  <SmallButton theme="dark" onClick={handleDelete}>
                    DELETE
                  </SmallButton>
                  <SmallButton theme="tertiary" onClick={handleUpdate}>
                    SAVE
                  </SmallButton>
                </div>
              ) : (
                <SmallButton theme="tertiary" onClick={() => setIsUpdate(true)}>
                  UPDATE
                </SmallButton>
              )}
            </>
          )}
        </div>
        {isUpdate ? (
          <FullInput
            type="text"
            value={boardData.title}
            onChange={(e) =>
              setBoardData({ ...boardData, title: e.target.value })
            }
            placeholder={"Title"}
          />
        ) : (
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              paddingBottom: "10px",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontFamily: "Bungee Inline",
                position: "relative",
                top: "1px",
                whiteSpace: "nowrap",
              }}
            >
              Title :
            </span>
            {boardData.title}
          </p>
        )}
        {isUpdate ? (
          <FullInput
            type="text"
            value={boardData.content}
            onChange={(e) =>
              setBoardData({ ...boardData, content: e.target.value })
            }
            placeholder={"Content"}
          />
        ) : (
          <p
            style={{
              fontSize: "16px",
              fontWeight: "regular",
              paddingBottom: "10px",
              minHeight: "120px",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontFamily: "Bungee Inline",
                position: "relative",
                top: "7px",
                whiteSpace: "nowrap",
              }}
            >
              Content :
            </span>
            {boardData.content}
          </p>
        )}
      </div>
      <div
        style={{
          borderBottom: "3px dotted #dd0000",
          borderTop: "5px solid #dd0000",
          width: "100%",
          gap: 10,
          display: "flex",
          flexDirection: "column",
          padding: "30px 30px",
          backgroundColor: "#F3EBEB",
        }}
      >
        <p
          style={{ fontSize: 14, fontFamily: "Bungee Inline", paddingLeft: 10 }}
        >
          Comment Wrtie
        </p>
        <FullInput
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Comment Wrtie"
        />
        <MediumButton onClick={createComment} theme="primary">
          Write
        </MediumButton>
      </div>
      <div
        style={{
          width: "100%",
          gap: 5,
          display: "flex",
          flexDirection: "column",
          paddingTop: "30px",
          backgroundColor: "#F3EBEB",
          padding: "30px 30px 30px 30px",
          flex: 1,
        }}
      >
        <p
          style={{
            fontSize: 14,
            fontFamily: "Bungee Inline",
            paddingLeft: 10,
          }}
        >
          Comment
        </p>
        {commentList.map((comment) => (
          <CommentList
            key={comment.id}
            comment={comment}
            handleDelete={deleteComment}
            handleUpdate={updateComment}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardDetail;

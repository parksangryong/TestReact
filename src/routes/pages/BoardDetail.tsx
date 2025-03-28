import { useParams, useLocation, useNavigate } from "react-router-dom";
import FullInput from "../../components/FullInput";
import {
  fetchCommentList,
  fetchCommentCreate,
  fetchCommentDelete,
  fetchCommentUpdate,
} from "../../services/api/commentService";
import { useEffect, useState } from "react";
import CommentList from "../../components/CommentList";
import { getData } from "../../utils/AsyncStorage";
import { USER_ID_KEY } from "../../services/config/config";
import {
  fetchBoardDelete,
  fetchBoardUpdate,
} from "../../services/api/boardService";
import MediumButton from "../../components/MediumButton";
import SmallButton from "../../components/SmallButton";
import { FaLock } from "react-icons/fa";

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

  const navigate = useNavigate();

  const handleDelete = async () => {
    await fetchBoardDelete(Number(id));
    navigate("/", { replace: true });
  };

  const handleUpdate = async () => {
    const params = {
      userId: Number(userId),
      title: boardData.title,
      content: boardData.content,
    };
    await fetchBoardUpdate(Number(id), params);
    setIsUpdate(false);
  };

  const getCommentList = async () => {
    const params = {
      offset: 0,
      count: 10,
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
        paddingBottom: "30px",
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
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontFamily: "Bungee Inline",
                position: "relative",
                top: "1px",
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
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontFamily: "Bungee Inline",
                position: "relative",
                top: "1px",
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
          padding: "20px 30px",
        }}
      >
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
          width: "90%",
          gap: 5,
          display: "flex",
          flexDirection: "column",
          paddingTop: "30px",
        }}
      >
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

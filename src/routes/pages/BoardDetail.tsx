import { useParams, useLocation } from "react-router-dom";
import FullInput from "../../components/FullInput";
import { PrimaryButton } from "mirr-ui";
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

type Comment = {
  id: number;
  content: string;
  userId: number;
  boardId: number;
};

const BoardDetail = () => {
  const { id } = useParams();
  const { title, content } = useLocation().state;
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const userId = getData(USER_ID_KEY)?.idx;

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
      }}
    >
      <p
        style={{ fontSize: "20px", fontWeight: "bold", paddingBottom: "10px" }}
      >
        {title}
      </p>
      <p
        style={{
          fontSize: "16px",
          fontWeight: "regular",
          paddingBottom: "10px",
          minHeight: "120px",
        }}
      >
        {content}
      </p>
      <div
        style={{
          padding: 10,
          border: "1px solid #ccc",
          borderRadius: 10,
          width: "90%",
          gap: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FullInput
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <PrimaryButton onClick={createComment} theme="social">
          댓글 작성
        </PrimaryButton>
      </div>
      <div
        style={{
          width: "90%",
          gap: 10,
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

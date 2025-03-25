import { useParams, useLocation } from "react-router-dom";
import FullInput from "../../components/FullInput";
import { PrimaryButton } from "mirr-ui";

const BoardDetail = () => {
  const { id } = useParams();
  const { title, content } = useLocation().state;

  const getCommentList = () => {};

  const createComment = () => {};

  const deleteComment = () => {};

  const updateComment = () => {};

  console.log(id);

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
        <FullInput type="text" placeholder="댓글을 입력하세요" />
        <PrimaryButton onClick={() => {}} theme="social">
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
        <p>댓글</p>
        <p>댓글</p>
        <p>댓글</p>
        <p>댓글</p>
        <p>댓글</p>
      </div>
    </div>
  );
};

export default BoardDetail;

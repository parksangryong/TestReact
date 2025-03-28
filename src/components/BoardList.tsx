import { useNavigate } from "react-router-dom";
type BoardListProps = {
  board: { id: number; title: string; content: string; userId: number };
};

const BoardList = ({ board }: BoardListProps) => {
  const navigate = useNavigate();

  return (
    <div
      key={board.id}
      style={{
        border: "2px solid #dd0000",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        padding: 10,
      }}
      onClick={() => {
        navigate(`/board/${board.id}`, {
          state: {
            idx: board.userId,
            title: board.title,
            content: board.content,
          },
        });
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
          cursor: "pointer",
        }}
      >
        <h2>
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
                fontSize: "15px",
                fontWeight: "bold",
                display: "flex",
                gap: "10px",
                flex: 1,
                alignItems: "center",
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
              {board.title}
            </span>
          </div>
        </h2>
        <p>
          <span
            style={{
              fontSize: "13px",
              fontWeight: "regular",
              gap: "10px",
              display: "flex",
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
            {board.content}
          </span>
        </p>
      </div>
    </div>
  );
};

export default BoardList;

import { useForm, FieldValues } from "react-hook-form";

// components
import BoardList from "../../components/BoardList";
import FullInput from "../../components/FullInput";
import MediumButton from "../../components/MediumButton";

// utils
import { getData } from "../../utils/AsyncStorage";
import { USER_ID_KEY } from "../../services/config/config";

// hooks
import { useBoardList, useBoardCreate } from "../../hooks/useBoard";

const Home = () => {
  const { register, handleSubmit, reset } = useForm();
  const userId = getData(USER_ID_KEY)?.idx;

  const { mutateAsync: createBoard } = useBoardCreate();
  const {
    data: boards,
    isLoading,
    isError,
  } = useBoardList({
    offset: 0,
    count: 30,
  });

  const onSubmit = async (data: FieldValues) => {
    const params = {
      title: data.title,
      content: data.content,
      userId: Number(userId),
    };
    await createBoard(params).then(() => {
      reset();
    });
  };

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
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error</div>}
        {boards &&
          boards.map(
            (board: {
              id: number;
              title: string;
              content: string;
              userId: number;
            }) => <BoardList key={board.id} board={board} />
          )}
      </div>
    </div>
  );
};

export default Home;

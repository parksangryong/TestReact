import { useForm, FieldValues } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "mirr-ui";
import FullInput from "../../components/FullInput";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const response = await axios.post("http://localhost:3002/auth/login", {
      email: data.email,
      password: data.password,
    });

    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: "10px",
        padding: "0 10px",
      }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", padding: "30px 0 0 0" }}
      >
        로그인
      </h1>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <FullInput
          {...register("email", { required: true })}
          placeholder="이메일"
        />
        <FullInput
          {...register("password", { required: true })}
          placeholder="비밀번호"
          type="password"
        />
        <PrimaryButton theme="social" onClick={handleSubmit(onSubmit)}>
          로그인
        </PrimaryButton>
      </form>
      <PrimaryButton theme="dark" onClick={() => navigate("/auth/register")}>
        회원가입페이지로 이동
      </PrimaryButton>
    </div>
  );
};

export default Login;

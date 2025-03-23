import axios from "axios";
import { PrimaryButton } from "mirr-ui";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FullInput from "../../components/FullInput";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    const response = await axios.post("http://localhost:3002/auth/register", {
      email: data.email,
      name: data.name,
      age: data.age,
      password: data.password,
    });
    console.log(response.data);

    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        padding: "0 10px",
        flex: 1,
      }}
    >
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", padding: "30px 0 0 0" }}
      >
        회원가입
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
          {...register("name", { required: true })}
          placeholder="이름"
        />

        <FullInput
          {...register("age", { required: true })}
          placeholder="나이"
          type="number"
        />
        <FullInput
          {...register("password", { required: true })}
          placeholder="비밀번호"
          type="password"
        />
        <PrimaryButton theme="social" onClick={handleSubmit(onSubmit)}>
          회원가입
        </PrimaryButton>
      </form>
      <PrimaryButton theme="dark" onClick={() => navigate("/auth/login")}>
        로그인페이지로 이동
      </PrimaryButton>
    </div>
  );
};

export default Register;

import { useForm, FieldValues } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          placeholder="이메일"
        />
        <input
          {...register("password", { required: true })}
          placeholder="비밀번호"
          type="password"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;

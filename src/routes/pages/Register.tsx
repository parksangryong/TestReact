import axios from "axios";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { required: true })}
          placeholder="이메일"
        />
        <input {...register("name", { required: true })} placeholder="이름" />

        <input
          {...register("age", { required: true })}
          placeholder="나이"
          type="number"
        />
        <input
          {...register("password", { required: true })}
          placeholder="비밀번호"
          type="password"
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Register;

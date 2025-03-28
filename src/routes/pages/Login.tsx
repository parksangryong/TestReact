import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FullInput from "../../components/FullInput";
import { fetchLogin } from "../../services/api/authService";
import MediumButton from "../../components/MediumButton";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const params = {
      email: data.email,
      password: data.password,
    };

    await fetchLogin(params);
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
      <span
        style={{
          fontSize: "14px",
          padding: "30px 10px 0 10px",
          fontFamily: "Bungee Inline",
        }}
      >
        LOGIN
      </span>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <FullInput
          {...register("email", { required: true })}
          placeholder="Email"
        />
        <FullInput
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        />
        <MediumButton theme="primary" onClick={handleSubmit(onSubmit)}>
          LOGIN
        </MediumButton>
      </form>
      <MediumButton
        theme="secondary"
        onClick={() => navigate("/auth/register")}
      >
        REGISTER
      </MediumButton>
    </div>
  );
};

export default Login;

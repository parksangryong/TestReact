import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

// components
import FullInput from "../../components/FullInput";
import MediumButton from "../../components/MediumButton";

// hooks
import { useRegister } from "../../hooks/useAuth";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { mutateAsync: registerMutate } = useRegister();

  const onSubmit = async (data: FieldValues) => {
    const params = {
      email: data.email,
      name: data.name,
      age: data.age,
      password: data.password,
    };
    await registerMutate(params);
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
        style={{
          fontSize: "14px",
          padding: "30px 10px 0 10px",
          fontFamily: "Bungee Inline",
        }}
      >
        REGISTER
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
          placeholder="Email"
        />
        <FullInput
          {...register("name", { required: true })}
          placeholder="Name"
        />

        <FullInput
          {...register("age", { required: true })}
          placeholder="Age"
          type="number"
        />
        <FullInput
          {...register("password", { required: true })}
          placeholder="Password"
          type="password"
        />
        <MediumButton theme="primary" onClick={handleSubmit(onSubmit)}>
          JOIN
        </MediumButton>
      </form>
      <MediumButton theme="secondary" onClick={() => navigate("/auth/login")}>
        BACK
      </MediumButton>
    </div>
  );
};

export default Register;

// components
import FullInput from "../../components/FullInput";
import MediumButton from "../../components/MediumButton";

// utils
import { USER_ID_KEY } from "../../services/config/config";
import { getData } from "../../utils/AsyncStorage";

// hooks
import { useUserUpdate, useUserDetail } from "../../hooks/useUser";

// packages
import { FieldValues, useForm } from "react-hook-form";

const Setting = () => {
  const userId = getData(USER_ID_KEY)?.idx;
  const { register, handleSubmit } = useForm();

  const { data: userData } = useUserDetail(Number(userId));
  const { mutateAsync: updateUser } = useUserUpdate();

  const onSubmit = async (data: FieldValues) => {
    const params = {
      name: data.name === "" ? userData?.name : data.name,
      age: data.age === "" ? userData?.age : data.age,
      password: data.password === "" ? userData?.password : data.password,
    };

    await updateUser({
      id: Number(userId),
      data: params,
    });
  };

  return (
    <div
      style={{
        padding: "50px 30px",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <span
          style={{
            fontSize: "16px",
            paddingTop: "20px",
            fontFamily: "Bungee Inline",
          }}
        >
          User Setting
        </span>
        <FullInput
          {...register("email")}
          placeholder="E-mail"
          defaultValue={userData?.email}
          disabled
        />
        <FullInput
          {...register("name")}
          placeholder="Name"
          defaultValue={userData?.name}
        />
        <FullInput
          {...register("age")}
          placeholder="Age"
          defaultValue={userData?.age}
        />
        <FullInput
          {...register("password")}
          placeholder="Password"
          type="password"
          defaultValue={userData?.password}
        />
        <MediumButton
          theme="primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          Edit
        </MediumButton>
      </form>
    </div>
  );
};

export default Setting;

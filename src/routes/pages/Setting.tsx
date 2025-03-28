import { useEffect, useState } from "react";
import { fetchUserDetail, updateUser } from "../../services/api/userService";

import { USER_ID_KEY } from "../../services/config/config";
import FullInput from "../../components/FullInput";
import { getData } from "../../utils/AsyncStorage";
import MediumButton from "../../components/MediumButton";
import { useNavigate } from "react-router-dom";

type UpdateUserState = {
  name: string;
  age: number;
  password: string;
  email: string;
};

const Setting = () => {
  const navigate = useNavigate();
  const userId = getData(USER_ID_KEY)?.idx;
  const [user, setUser] = useState<UpdateUserState>({
    name: "",
    age: 0,
    password: "",
    email: "",
  });

  const getUser = async () => {
    const res = await fetchUserDetail(Number(userId));
    const user = res.user[0];
    setUser({
      name: user.name,
      age: user.age,
      password: user.password,
      email: user.email,
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleChange =
    (field: keyof UpdateUserState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async () => {
    await updateUser(Number(userId), {
      name: user.name,
      age: user.age,
      password: user.password,
    });
    navigate("/");
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
        placeholder="E-mail"
        value={user?.email}
        disabled
        onChange={handleChange("email")}
      />
      <FullInput
        placeholder="Name"
        value={user?.name}
        onChange={handleChange("name")}
      />
      <FullInput
        placeholder="Age"
        value={user?.age}
        onChange={handleChange("age")}
      />
      <FullInput
        placeholder="Password"
        type="password"
        value={user?.password}
        onChange={handleChange("password")}
      />
      <MediumButton onClick={handleSubmit}>Edit</MediumButton>
    </div>
  );
};

export default Setting;

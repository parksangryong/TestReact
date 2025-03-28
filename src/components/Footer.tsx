import SmallButton from "./SmallButton";
import { useState } from "react";
import { fetchUploadFile } from "../services/api/uploadService";
import { getData } from "../utils/AsyncStorage";
import { USER_ID_KEY } from "../services/config/config";

const Footer = () => {
  const userId = getData(USER_ID_KEY)?.idx;
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  const handleUpload = async () => {
    if (!file) return;
    await fetchUploadFile(file, Number(userId)).then(() => {
      setFile(null);
    });
  };

  return (
    <div
      style={{
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#440000",
        alignItems: "center",
        padding: "0 20px",
        minHeight: "60px",
        color: "#fff",
      }}
    >
      <input type="file" onChange={handleFileChange} />
      <SmallButton theme="secondary" onClick={handleUpload}>
        Upload
      </SmallButton>
    </div>
  );
};

export default Footer;

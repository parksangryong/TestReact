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

    // 이미지 파일 타입 검증
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

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
        gap: 10,
        backgroundColor: "#440000",
        alignItems: "center",
        padding: "0 20px",
        minHeight: "60px",
        color: "#fff",
      }}
    >
      <input
        type="file"
        id="file-input"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <SmallButton
        theme="secondary"
        onClick={() => {
          document.getElementById("file-input")?.click();
        }}
      >
        File +
      </SmallButton>
      {file && (
        <>
          <p style={{ color: "#fff", fontSize: 10 }}>{file.name}</p>
          <SmallButton theme="primary" onClick={handleUpload}>
            Upload
          </SmallButton>
        </>
      )}
    </div>
  );
};

export default Footer;

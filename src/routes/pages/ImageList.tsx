import SmallButton from "../../components/SmallButton";
import { useEffect, useState } from "react";
import {
  fetchUploadFile,
  fetchUploadList,
  fetchDownloadFile,
} from "../../services/api/uploadService";
import { getData } from "../../utils/AsyncStorage";
import { USER_ID_KEY } from "../../services/config/config";

type ListType = {
  id: number;
  userId: string;
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
};

const ImageList = () => {
  const userId = getData(USER_ID_KEY)?.idx;
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<ListType[]>([]);

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
    await fetchUploadFile(file, Number(userId))
      .then(() => {
        setFile(null);
      })
      .then(() => {
        getUploadList();
      });
  };

  const getUploadList = async () => {
    const res = await fetchUploadList();
    setFileList(res.files);
  };

  const downloadFile = async (id: number) => {
    try {
      const res = await fetchDownloadFile(id);
      const response = await fetch(`http://localhost:3002/${res.url}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = res.url.split("/").pop() || "image";
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUploadList();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
        padding: "50px 30px 30px 30px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
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
            <p
              style={{
                color: "#000",
                fontSize: 8,
                textAlign: "left",
                maxWidth: "200px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {file.name}
            </p>
            <SmallButton theme="primary" onClick={handleUpload}>
              Upload
            </SmallButton>
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        {fileList.map((file) => (
          <div key={file.id} style={{ display: "flex", flexDirection: "row" }}>
            <img
              onClick={() => {
                downloadFile(file.id);
              }}
              src={`http://localhost:3002/${file.fileUrl}`}
              alt="image"
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;

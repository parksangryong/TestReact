import { useState } from "react";

// components
import SmallButton from "../../components/SmallButton";

// utils
import { getData } from "../../utils/AsyncStorage";
import { USER_ID_KEY } from "../../services/config/config";

// packages
import dayjs from "dayjs";

// hooks
import {
  useUploadList,
  useUploadFile,
  useDownloadFile,
} from "../../hooks/useUplaod";

const ImageList = () => {
  const userId = getData(USER_ID_KEY)?.idx;
  const [file, setFile] = useState<File | null>(null);

  const { data: uploadList } = useUploadList();
  const { mutateAsync: uploadFile } = useUploadFile();
  const { mutateAsync: downloadFileMutation } = useDownloadFile();

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
    await uploadFile({ file, userId: Number(userId) }).then(() => {
      setFile(null);
    });
  };

  const downloadFile = async (id: number) => {
    await downloadFileMutation(id);
  };

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
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        {uploadList &&
          uploadList?.map(
            (file: {
              id: number;
              fileUrl: string;
              fileName: string;
              fileSize: number;
              fileType: string;
              createdAt: string;
            }) => (
              <div
                key={file.id}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <img
                  onClick={() => {
                    downloadFile(file.id);
                  }}
                  src={`http://localhost:3002/${file.fileUrl}`}
                  alt="image"
                  style={{ width: "150px", height: "150px" }}
                />
                <p className="img-sub">Name: {file.fileName}</p>
                <p className="img-sub">Size: {file.fileSize}</p>
                <p className="img-sub">Type: {file.fileType}</p>
                <p className="img-sub">
                  At: {dayjs(file.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                </p>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default ImageList;

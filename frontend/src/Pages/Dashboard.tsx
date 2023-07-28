import "./dashboard.css";
import { UploadFile } from "@/apis/apis";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useRef, useState } from "react";

const Dashboard = () => {
  const [toast, setToast] = useState({
    showToast: false,
    message: "Sample Message",
  });
  const handleChange = async (file: File) => {
    const FileData = new FormData();
    FileData.append("filetack", file);
    const { data } = await UploadFile(FileData);
    if (data.success) {
      setToast({
        showToast: true,
        message: data.message,
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setToast({
        showToast: false,
        message: "",
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-container">
      <img src="assets/logo.png" alt="Inshare logo" className="logo" />
      <section className="upload-container">
        <div>
          <FileUploader handleChange={handleChange}>
            <div className="drop-zone">
              <div className="icon-container">
                <img
                  src="https://img.icons8.com/flat-round/512/upload-document--v1.png"
                  draggable="false"
                  className="center"
                  alt="File Icon"
                />
              </div>
              <input type="file" name="filetack" multiple={true} />
              <div className="title">
                Drop your Files here or, <span id="browseBtn">browse</span>
              </div>
            </div>
          </FileUploader>
        </div>

        <div className="sharing-container">
          <p className="expire">Link expires in 24 hrs</p>

          <div className="input-container">
            <input type="text" id="fileURL" readOnly />
            <img
              src="assets/copy-icon.svg"
              id="copyURLBtn"
              alt="copy to clipboard icon"
            />
          </div>

          <p className="email-info">Or Send via Email</p>
          <div className="email-container">
            <form id="emailForm">
              <div className="filed">
                <label htmlFor="fromEmail">Your email</label>
                <input
                  type="email"
                  autoComplete="email"
                  required
                  name="from-email"
                  id="fromEmail"
                />
              </div>

              <div className="filed">
                <label htmlFor="toEmail">Receiver&apos;s email</label>
                <input
                  type="email"
                  required
                  autoComplete="receiver"
                  name="to-email"
                  id="toEmail"
                />
              </div>
              <div className="send-btn-container">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      <div className={`toast ${toast.showToast === true ? "show" : "hidden"}`}>
        <div className="flex justify-between ">
          <div>{toast.message}</div>
          <div className="cursor-pointer">
            <img
              src="https://img.icons8.com/fluency/24/cancel.png"
              onClick={() => setToast({ ...toast, showToast: false })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

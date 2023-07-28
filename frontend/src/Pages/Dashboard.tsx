import "./dashboard.css";
import { UploadFile } from "@/apis/apis";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [toast, setToast] = useState({
    showToast: false,
    message: "Sample Message",
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [loadingPercent, setLoadingPercent] = useState<number | string>(0);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState<boolean>(false);

  const handleChange = async (file: File) => {
    const FileData = new FormData();

    /* test */
    
    // eslint-disable-next-line prefer-const
    let timer: NodeJS.Timeout | undefined;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setIsUploadSuccessful(true);
    }, 2000); // test purpose only
    /* NOTE: Remove it later */

    if (file) setIsUploading(true); // start the loader when inputting a file.
    FileData.append("filetack", file);
    const { data } = await UploadFile(FileData);
    if (data.success) {
      setIsUploadSuccessful(true);

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
          {!isUploading ? (
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

                <div className="title">
                  Drop your Files here or,{" "}
                  <span id="browseBtn" className="underline">
                    browse
                  </span>
                </div>
              </div>
            </FileUploader>
          ) : !isUploadSuccessful ? (
            <div className="min-w-max">
              <svg
                version="1.1"
                id="L9"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                className="h-20 w-20 animate-spin mx-auto"
                viewBox="0 0 100 100"
                enableBackground="new 0 0 0 0"
                xmlSpace="preserve"
              >
                <path
                  fill="#cccccc"
                  d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                ></path>
              </svg>
              <div className="text-black w-full">
                <p className="text-xl font-semibold tracking-wide">
                  File uploading.....
                  <span className="font-bold text-gray-600">{` ${loadingPercent}%`}</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="min-w-max">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 50 50"
                xmlSpace="preserve"
                className="h-20 w-20 mb-6 mx-auto animate-bounce"
              >
                <circle
                  style={{ fill: "#25AE88", cx: "25", cy: "25", r: "25" }}
                />
                <polyline
                  style={{
                    fill: "none",
                    stroke: "#FFFFFF",
                    strokeWidth: 2,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: 10,
                  }}
                  className="animate-"
                  points="  38,15 22,33 12,25 "
                />
              </svg>
              <div className="text-black ">
                <p className="text-xl font-semibold tracking-wide">
                  File Upload Successful!!
                </p>
              </div>
            </div>
          )}
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

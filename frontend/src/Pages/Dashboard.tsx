import "./dashboard.css";
import { UploadFile } from "@/apis/apis";
import { FileUploader } from "react-drag-drop-files";
import { useEffect, useState } from "react";

type Link = {
  file: string;
  link: string;
};
const Dashboard = () => {
  let timer: NodeJS.Timeout | undefined;
  const [toast, setToast] = useState({
    showToast: false,
    message: "Sample Message",
  });
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [loadingPercent, setLoadingPercent] = useState<number | string>(0);
  const [isUploadSuccessful, setIsUploadSuccessful] = useState<boolean>(false);
  const [dLink, setDLink] = useState<Link[] | string>("");
  const handleChange = async (file: File) => {
    const FileData = new FormData();
    // eslint-disable-next-line prefer-const
    if (timer) clearTimeout(timer);
    /* NOTE: Remove it later */
    if (file) setIsUploading(true); // start the loader when inputting a file.
    FileData.append("filetack", file);
    const { data } = await UploadFile(FileData);
    if (data.success) {
      setDLink(data.data.DLink);
      setIsUploadSuccessful(true);
    }
  };
  const handleCopyToclipboard = (link: string) => {
    setToast({
      showToast: true,
      message: "Copy To Clipboard",
    });
    timer = setTimeout(() => {
      setIsUploading(false);
      setIsUploadSuccessful(false);
      setToast({
        showToast: false,
        message: "",
      });
    }, 2000);
    navigator.clipboard.writeText(link);
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
                <circle className="circle_svg" />
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

                {Array.isArray(dLink) ? (
                  dLink.map((item, key) => {
                    return (
                      <div key={key} className="flex justify-between">
                        <div>{item.file}</div>
                        <div
                          className="cursor-pointer"
                          onClick={() => handleCopyToclipboard(item.link)}
                        >
                          {item.link}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="mt-4">
                    <div className="relative flex h-10 w-full">
                      <input
                        type="text"
                        className="peer text-md font-semibold  text-indigo-800 h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 pr-20  text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        value={dLink}
                        readOnly
                      />
                      <button
                        className="!absolute right-1 top-1 z-10 select-none rounded bg-indigo-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                        type="button"
                        data-ripple-light="true"
                        onClick={() => handleCopyToclipboard(dLink)}
                      >
                        Copy
                      </button>
                      <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">Link</label>
                    </div>
                  </div>
                )}
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

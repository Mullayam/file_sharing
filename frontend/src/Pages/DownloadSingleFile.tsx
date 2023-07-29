import { DownloadFile, FetchFile } from "@/apis/apis";
import React, { useEffect, useState } from "react";
import {
  redirect,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import moment from "moment";
type FileInfo = {
  id?: number;
  file_name?: string;
  ext?: string;
  expires_at?: string;
  expired_enabled?: string|number;
  size?: number;
  upload_at?: string;
  md5?: string;
  is_expired?: boolean;
};
const DownloadSingleFile = () => {
  document.title = "Download File | inShare";

  const { id, key } = useParams();
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();
  const [error, seterror] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [errMessage, setErrMessage] = useState("");
  const [FileInfo, setFileInfo] = useState<FileInfo>({});
  const fetchFileData = async () => {
    const { data } = await FetchFile(key as string, id as string);
    if (data.success) {
      setQuery({ pair: data.data.FileInfo.pair_key });
      setFileInfo(data.data.FileInfo);
      setLoading(false);
      return;
    }
    seterror(true);
    setErrMessage(data.data.error);
    setLoading(false);
  };
  const handleDownLoadFile = async () => {
    const { data } = await DownloadFile(id as string);
    if (!data.success) {
      seterror(true);
      setErrMessage(data.data.error);
      return;
    }
  };
  useEffect(() => {
    if (!id) {
      seterror(true);
      setErrMessage("Key id is missing");
    } else if (!key) {
      seterror(true);
      setErrMessage("File id is missing");
    } else {
      setLoading(true);
      fetchFileData();
    }
  }, []);

  return (
    <div className="dashboard-container">
      <section className="card w-[90%] p-8">
        <div>
          {error ? (
            <>
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
                role="alert"
              >
                <strong className="font-bold">Error! Unable To Download</strong>
              </div>
              <div
                id="alert-additional-content-2"
                className="p-4 mt-4 text-red-800 border text-center border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                role="alert"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="flex-shrink-0 w-4 h-4 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <h3 className="text-lg font-medium">
                    This is a danger alert
                  </h3>
                </div>
                <div className="mt-2 mb-4 text-xl">
                  <span className="block sm:inline font-semibold">
                    {errMessage}
                  </span>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => navigate("/")}
                    className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    <svg
                      className="-ml-0.5 mr-2 h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 14"
                    >
                      <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                    </svg>
                    Go Back
                  </button>
                </div>
              </div>
            </>
          ) : FileInfo.is_expired ? (
            ""
          ) : (
            <div className="mt-2 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 mb-3 shadow-lg"
                  src="https://mrriky54hd.altervista.org/cdn/assets/img/file_icon.svg"
                  alt="file_icon"
                />
              </div>

              <div className="w-full mx-auto max-w-screen-xl p-4  items-center justify-between">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    File Name
                  </p>
                  <span className="text-xl font-medium text-blue-600 hover:underline dark:text-blue-500 uppercase">
                    {FileInfo.file_name}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Extension
                  </span>
                  <span className="  mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <a
                      href="#"
                      className="text-xl font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      {FileInfo.ext}
                    </a>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Size
                  </span>
                  <span className="  mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <a
                      href="#"
                      className="text-xl font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      {FileInfo.size}
                    </a>
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Uploaded On
                  </span>
                  <span className="  mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <a
                      href="#"
                      className="text-xl font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      {moment(FileInfo.upload_at).fromNow()}
                    </a>
                  </span>
                </div>
                <div className="flex items-center justify-between invisible lg:visible md:visible sm:visible ">
                  <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Hash Key
                  </span>
                  <span className="  mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <a
                      href="#"
                      className="text-xl font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >
                      {FileInfo.md5}
                    </a>
                  </span>
                </div>
                {FileInfo.expired_enabled === 1 && (
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                      Expires On
                    </span>
                    <span className="  mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                      <a
                        href="#"
                        className="text-xl font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        {moment(FileInfo.expires_at).format("l")}(
                        {moment(FileInfo.expires_at).fromNow()})
                      </a>
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center pb-10">
                <button 
                onClick={handleDownLoadFile}
                className="inline-flex items-center px-4 py-2 text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DownloadSingleFile;

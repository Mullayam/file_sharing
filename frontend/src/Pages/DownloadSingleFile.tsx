import { FetchFile } from "@/apis/apis";
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import moment from "moment";
type FileInfo = {
  id?: number;
  file_name?: string;
  ext?: string;
  expires_at?: string;
  expiredEnabled?: string;
  size?: number;
  upload_at?: string;
  is_expired?: boolean;
};
const DownloadSingleFile = () => {
  const { id, key } = useParams();
  const [query, setQuery] = useSearchParams();
  const [error, seterror] = React.useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [FileInfo, setFileInfo] = useState<FileInfo>({});
  const FetchFileData = async () => {
    const { data } = await FetchFile(id as string);
    if (!data.success) {
      seterror(true);
      setErrMessage(data.message);
      return;
    }
    setFileInfo(data.data.FileInfo);
  };
  const DownloadFile = () => {
    console.log("first");
  };
  useEffect(() => {
    if (!id) {
      seterror(true);
      setErrMessage("Key id is missing");
    } else if (!key) {
      seterror(true);
      setErrMessage("File id is missing");
    } else if (!query.has("pair")) {
      seterror(true);
      setErrMessage("Pairing Token is missing");
    } else if (query.get("pair") !== key) {
      seterror(true);
      setErrMessage("File checksum Please Create a Link Again");
    } else {
      FetchFileData();
    }
  }, []);
  console.log(FileInfo);
  return (
    <div className="mx-auto card">
      {error ? (
        errMessage
      ) : (
        <div className="my-[100px] mx-5 rounded-xl inline-block p-5 max-w-md border-2 border-gray-300">
          <h1 className="font-bold">Download File</h1>
          <br />
          <p>
            Someone shared with you the file listed below. Click on the
            &quot;Download&quot; button to start downloading it.
          </p>
          <br />
          <div className="rounded-xl border-4 border-[#ccc] border-dashed text-left p-5">
            {FileInfo.is_expired ? (
              <div className="inline-block text-red-500">
                <p className="font-bold text-2xl items-center justify-center">File Expired</p>
              </div>
            ) : (
              <>
                <img
                  className="h-12 mr-3 items-center"
                  src="https://mrriky54hd.altervista.org/cdn/assets/img/file_icon.svg"
                />
                <div className="inline-block text-gray-500">
                  <p>File Name: {FileInfo.file_name}</p>
                  <p>File Size: {FileInfo.size}</p>
                  <p>File Extension: {FileInfo.ext || null}</p>
                  <p>
                    File Uploaded At: {moment(FileInfo.upload_at).fromNow()}
                  </p>
                  <p>
                    File Expring On: {moment(FileInfo.expires_at).format("ll")}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadSingleFile;

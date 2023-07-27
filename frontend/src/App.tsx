import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./Pages/Landing";
import Dashboard from "./Pages/Dashboard";
import Header from "./components/Header";
import DownloadSingleFile from "./Pages/DownloadSingleFile";
import FAQS from "./Pages/FAQS";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<Dashboard />} />
          <Route path="/download/file/:id/:key" element={<DownloadSingleFile />} />
          <Route path="/faqs" element={<FAQS/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

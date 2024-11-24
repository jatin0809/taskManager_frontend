import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Analytics, Dashboard, Login, Register, Settings, Share, NotFound, TaskFormData } from "../pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}  />
        <Route path="/dashboard" element={<Dashboard/>}  />
        <Route path="/analytics" element={<Analytics/>}  />
        <Route path="/login" element={<Login/>}  />
        <Route path="register/" element={<Register/>}  />
        <Route path="/settings" element={<Settings/>}  />
        <Route path="/share" element={<Share/>}  />
        <Route path="/create" element={<TaskFormData/>}  />
        <Route path="*" element={<NotFound/>}  />
      </Routes>
    </BrowserRouter>
  )
}


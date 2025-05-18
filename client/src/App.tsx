import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "@/pages/Landing";
import { NotFound } from "./components/ui/ghost-404-page";
import AuthPage from "./pages/AuthPage";
import { useEffect } from "react";
import { fetchMe } from "./redux/authSlice";
import { useAppDispatch } from "./redux/hooks";
import ProtectedRoute from "./components/ProtectedRoutes";
import Home from "./pages/home";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="signup"/>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App;
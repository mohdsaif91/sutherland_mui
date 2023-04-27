import { Suspense, lazy, useEffect } from "react";
import Header from "./Components/Header";
import { Route, Routes, useNavigate } from "react-router";

const HomePage = lazy(() => import("./Pages/HomePage"));
const AuthPage = lazy(() => import("./Pages/AuthPage"));

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const loginFlag = localStorage.getItem("loggedIn");
    console.log(JSON.parse(loginFlag), " MAIN");
    if (JSON.parse(loginFlag)) {
      navigate("/home");
    } else {
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<AuthPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

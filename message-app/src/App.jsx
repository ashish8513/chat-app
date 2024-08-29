import { Toaster } from "react-hot-toast";
import Left from "./Left/Left";
import Right from "./Right/Right";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useAuth } from "./context/Authprovider";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser)
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                  <Right />
                </div>
                <div className="drawer-side">
                  <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                  <ul className="menu w-92 min-h-full bg-black text-base-content">

                    <Left />
                  </ul>
                </div>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
      </Routes>
      <Toaster />
    </>
  )
}
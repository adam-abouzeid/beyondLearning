import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import "./LoginScreen.css";
const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();

      dispatch(setCredentials({ ...res }));
      console.log(redirect);
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="form-entry">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          SIGN IN
        </button>
        {isLoading && <Loader />}
      </form>
      <div className="links">
        New User?{" "}
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;

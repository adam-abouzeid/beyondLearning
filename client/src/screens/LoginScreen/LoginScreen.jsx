import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "../../components/Button/Button";
import Boarding from "../../assets/landing.jpg";
import { useLoginMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

import "./LoginScreen.css";
const LoginScreen = () => {
  // get the user info to see if logged in
  const { userInfo } = useSelector((state) => state.auth);

  //  Initialize Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // login function mutation redux-toolkit
  const [login, { isLoading }] = useLoginMutation();

  // Check url
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect); //if logged in, redirect
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // call the login function
      const res = await login({ email, password }).unwrap(); //unwrap method is used to extract payload from promise or throw an error in a rejected action scenario

      dispatch(setCredentials({ ...res })); //setCredentials which sets the state and localStorage
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="login-layout flex">
      <div className="login-form flex center column">
        <div className="auth-header">
          <h1>LOG IN TO CONTINUE</h1>
        </div>
        <form
          style={{ width: "100%", height: "100%" }}
          onSubmit={submitHandler}
        >
          <div className="input-container flex column">
            <label>EMAIL</label>
            <input
              className="login-input"
              autoComplete="off"
              name="email"
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div className="input-container flex column">
            <div className="password-labels flex">
              <label>PASSWORD</label>
              <span className="forgot-password bottom">FORGOT PASSWORD?</span>
            </div>
            <input
              className="login-input"
              autoComplete="off"
              name="password"
              id="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label className="checkbox-password">
              <input
                type="checkbox"
                name="html"
                value="html"
                checked={showPassword}
                onClick={() => setShowPassword(!showPassword)}
              />{" "}
              Show Password
            </label>
          </div>
          <div className="login-button">
            <Button
              type="submit"
              secondary={true}
              title={isLoading ? "Loading..." : "LOGIN"}
            ></Button>
          </div>
        </form>
      </div>

      <div
        className="login-boarding"
        style={{
          backgroundImage: "url(" + Boarding + ")",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  );
};

export default LoginScreen;

import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/AuthAction";

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const error = useSelector((state) => state.authReducer.error);
  console.log({ loading: loading });
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    password: "",
    confirmpass: "",
    username: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET_AUTH_ERROR" });

    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
      // if (data.password !== data.confirmpass) {
      //   setConfirmPass(false);
      // } else {
      //   setConfirmPass(true);
      // }
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      password: "",
      confirmpass: "",
      username: "",
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>YuraGms Media</h1>
          <h6>Explore the ideas throught the world</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form action="" className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First name"
                name="firstname"
                className="infoInput"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last name"
                name="lastname"
                className="infoInput"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Usernames"
              name="username"
              className="infoInput"
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="infoInput"
              onChange={handleChange}
              value={data.password}
            />

            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmpass"
                className="infoInput"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <div>
            {error && (
              <p className="Error">
                {error === 404
                  ? "This username does not exist"
                  : error === 400
                  ? isSignUp
                    ? "username is already registred!"
                    : "password not valid for this username"
                  : error === 500
                  ? "Please fill in all fields"
                  : error}
              </p>
            )}
          </div>

          <span
            style={{
              display: confirmPass ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
            }}
          >
            * Confirm Password is not same!
          </span>
          <div>
            <span
              style={{ fontSize: "12px", cursor: "pointer" }}
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
                dispatch({ type: "RESET_AUTH_ERROR" });
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account? Sign Up"}
            </span>
          </div>
          <button
            className="button infoButton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : isSignUp ? "Signup" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Auth;

// function SignUp() {
//   return (
//     <div className="a-right">
//       <form action="" className="infoForm authForm">
//         <h3>Sign up</h3>
//         <div>
//           <input
//             type="text"
//             placeholder="First name"
//             name="firstname"
//             className="infoInput"
//           />
//           <input
//             type="text"
//             placeholder="Last name"
//             name="lastname"
//             className="infoInput"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Usernames"
//             name="username"
//             className="infoInput"
//           />
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder="Password"
//             name="password"
//             className="infoInput"
//           />
//           <input
//             type="text"
//             placeholder="Confirm Password"
//             name="confirmpass"
//             className="infoInput"
//           />
//         </div>
//         <div>
//           <span style={{ fontSize: "12px" }}>
//             Already have an account. Login!
//           </span>
//         </div>
//         <button className="button infoButton" type="submit">
//           Signup
//         </button>
//       </form>
//     </div>
//   );
// }

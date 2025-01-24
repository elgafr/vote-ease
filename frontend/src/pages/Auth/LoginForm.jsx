import { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import AuthInput from "../../components/input/AuthInput";
import { Link, useNavigate } from "react-router";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [loginError, setLoginError] = useState(null); 

  const {updateUser} = useContext(UserContext)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    } else {
      setEmailError(null); 
    }


    if (!password) {
      setPasswordError("Please enter the password");
      isValid = false;
    } else {
      setPasswordError(null); 
    }

    if (!isValid) return;

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      if (token) {
        setLoginError(null); 
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard"); 
      }
    } catch (error) {
      console.error("Login failed", error);
      setLoginError(
        "Invalid email or password"
      );
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold mb-1">Welcome Back</h3>
        <p className="text-md mt-[5px] mb-8">
          Please enter your details to log in
        </p>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <AuthInput
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="Enter your email address"
                type="email"
              />
              <p
                className={`text-red-500 font-medium text-xs mt-1 ${
                  emailError ? "visible" : "invisible"
                }`}
              >
                {emailError || "Placeholder"}
              </p>
            </div>

            <div>
              <AuthInput
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
              <p
                className={`text-red-500 font-medium text-xs mt-1 ${
                  passwordError ? "visible" : "invisible"
                }`}
              >
                {passwordError || "Placeholder"}
              </p>

              <p
                className={`text-red-500 font-medium text-xs mt-1 ${
                  loginError ? "visible" : "invisible"
                }`}
              >
                {loginError || "Placeholder"}
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-neutral w-full text-lg text-white mt-4 mb-4"
          >
            Login
          </button>

          <p className="text-md">
            {`Don't have an account? `}
            <Link className="font-medium text-neutral underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default LoginForm;

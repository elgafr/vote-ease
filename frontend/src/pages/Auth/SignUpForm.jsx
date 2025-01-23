import { useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import AuthInput from "../../components/input/AuthInput";
import { validateEmail } from "../../utils/helper";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setFullNameError("Please enter your full name");
      return;
    } else {
      setFullNameError(null);
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError(null);
    }

    if (!username) {
      setUsernameError("Please enter a username");
      return;
    } else {
      setUsernameError(null);
    }

    if (!password) {
      setPasswordError("Please enter the password");
      return;
    } else {
      setPasswordError(null);
    }

    // sign up API logic here
    try {
      // Handle successful sign-up
    } catch (error) {
      console.error("Sign up failed", error);
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold mb-1">Create an Account</h3>
        <p className="text-md mt-[5px] mb-8">
          Join us today by entering your details below.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
            <div>
              <AuthInput
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="Enter your name"
                type="text"
              />
              <p
                className={`text-red-500 font-medium text-xs mt-1 ${
                  fullNameError ? "visible" : "invisible"
                }`}
              >
                {fullNameError || "Placeholder"}
              </p>
            </div>

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
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                label="Username"
                placeholder="Enter your username @"
                type="text"
              />
              <p
                className={`text-red-500 font-medium text-xs mt-1 ${
                  usernameError ? "visible" : "invisible"
                }`}
              >
                {usernameError || "Placeholder"}
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
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-neutral w-full text-lg text-white mt-8 mb-4"
          >
            Sign Up
          </button>

          <p className="text-md">
            {`Already have an account? `}
            <Link className="font-medium text-neutral underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUpForm;

import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
const AuthInput = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label className="text-md font-semibold">{label}</label>

      <div className="input-box input input-bordered">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          placeholder={placeholder}
          className="w-full max-w-xs"
          value={value}
          onChange={(e) => onChange(e)}
        />

        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-base-200 cursor-pointer"
                onClick={() => toggleShowPassword()}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthInput;

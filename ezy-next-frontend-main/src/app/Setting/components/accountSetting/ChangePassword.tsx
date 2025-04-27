import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { IoMdKey } from "react-icons/io";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../../context/ThemeContext";
import { updatePassword } from "../../../api/changePasswordAPI";

function validatePassword(password: string) {
  return password.length >= 8 ? null : "Password must be at least 8 characters long.";
}

const ChangePassword = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const { theme, primaryColor, defaultColor } = useTheme();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [oldType, setOldType] = useState("password");
  const [newType, setNewType] = useState("password");

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);

  const notifySuccess = () => toast.success("Password updated successfully!");
  const notifyError = (message: string) => toast.error(message);

  useEffect(() => {
    let error = validatePassword(newPassword);
    if (!error && newPassword === oldPassword) {
      error = "New password cannot be the same as the old password.";
    }
    setPasswordError(error);
    
    if(error) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false);
    };
  }, [newPassword, oldPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { success, message } = await updatePassword(oldPassword, newPassword);

    if (success) {
      notifySuccess();
      setOldPassword("");
      setNewPassword("");
    } else {
      notifyError(message || "An error occurred.");
    }
  };

  const handleToggleOld = () => {
    setOldType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleToggleNew = () => {
    setNewType((prev) => (prev === "password" ? "text" : "password"));
  };

  return (
    <>
      <div
        className={`min-w-60 mx-auto p-6 ${isDarkMode ? "bg-gray-800 text-slate-100" : "bg-white text-gray-900"
          } rounded-lg shadow-lg`}
      >
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 sm:gap-4">
              <IoMdKey size={24} />
              <span className="text-base sm:text-lg">Change Password</span>
            </h3>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
              Old password
            </label>
            <input
              type={oldType}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter old password"
              required
              autoComplete="new-password"
              className="mb-6 p-2 w-full bg-gray-100 dark:bg-gray-700 border rounded focus:outline-none"
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg cursor-pointer"
              onClick={handleToggleOld}
            >
              {oldType === "password" ? <VscEye size={24} /> : <VscEyeClosed size={24} />}
            </span>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-900 dark:text-white mb-1">
              New password
            </label>
            <input
              type={newType}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
              autoComplete="new-password"
              className="mb-6 p-2 w-full bg-gray-100 dark:bg-gray-700 border rounded focus:outline-none"
            />
            <span
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-lg cursor-pointer"
              onClick={handleToggleNew}
            >
              {newType === "password" ? <VscEye size={24} /> : <VscEyeClosed size={24} />}
            </span>
          </div>

          {newPassword && passwordError && (
            <div className="px-1 mb-4 font-light text-red-400">{passwordError}</div>
          )}

          <div className="flex flex-col sm:flex-row justify-start gap-2 mt-2">
            <button
              type="submit"
              disabled={isDisabled}
              className={`px-4 py-2 transition-all duration-300 text-white rounded w-full ${isDisabled ? 'hover:cursor-not-allowed' : 'active:scale-95 active:bg-opacity-90'}`}
              style={{
                backgroundColor: theme === "custom" ? primaryColor : defaultColor,
              }}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};


export default ChangePassword;

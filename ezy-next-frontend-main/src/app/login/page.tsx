"use client";

import { useEffect, useState } from "react";
import { login, setCookie } from "../api/authAPI";
import Image from "next/image";
import signupImage from "../../../public/assets/signup.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaMoon, FaSun } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import LoadingPage from "../components/LoadingPage";


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [urlToken, setUrlToken] = useState(false)

    const { isDarkMode, toggleDarkMode } = useTheme();

    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get("token")
        const error = params.get('error')

        if (error && error === '404') {
            toast.error('You do not have an account registered with that email.')
            return
        }

        const googleLogin = async () => {
            const response = await setCookie(token)
            if (response.status === 200) {
                toast.success('Log in successful')
                router.push("/dashboardMain");
            }
        }

        if (token) googleLogin()
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true);

        try {
            const response = await login(username, password);
            if (response.status === 200) {
                toast.success('Log in successful')
                router.push("/dashboardMain");
            }
        } catch (error) {
            toast.error("Wrong credentials. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        try {
            window.location.href = 'https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/auth/google';
        } catch (error) {
            toast.error("Failed to redirect to Google authentication. Please try again.");
        }
    };

    function GoogleLoginButton() {
        return (
            <button
                onClick={handleGoogleLogin}
                className="w-full h-12 md:h-14 px-4 py-2 bg-white text-black rounded shadow hover:bg-sky-100 flex items-center justify-center space-x-2 my-2"
            >
                <FcGoogle size={25} />
                <span>Login with Google</span>
            </button>
        );
    }

    if (urlToken) return <LoadingPage />

    return (
        <div className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex justify-center items-center relative`}>
            <button onClick={toggleDarkMode} className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
            </button>
            <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl mx-auto p-4">
                <div className="hidden lg:block lg:w-1/2 xl:w-2/5 pr-8">
                    <Image
                        src={signupImage}
                        alt="Sign Up"
                        width={500}
                        height={300}
                        className="max-w-full h-auto"
                        priority
                    />
                </div>
                <div className={`w-full sm:w-[90%] md:w-3/4 lg:w-1/2 xl:w-2/5 ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg rounded-lg flex flex-col items-center justify-center p-6 md:p-8`}>
                    <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 font-extrabold text-center">
                        Welcome to{" "}
                        <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold">Ezy</span>
                        <span style={{ color: "#1C6BA0" }} className="text-2xl md:text-3xl lg:text-4xl font-extrabold">Metrics</span>
                    </h1>
                    <GoogleLoginButton></GoogleLoginButton>

                    <button className="w-full h-12 md:h-14 px-4 py-2 bg-white text-black rounded shadow hover:shadow-lg flex items-center justify-center space-x-2 my-2">
                        <FaFacebookF size={25} className="ml-5" />
                        <span>Login with Facebook</span>
                    </button>
                    <div className="flex items-center w-full my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <form className="w-full" onSubmit={handleLogin}>
                        <div className="relative w-full h-12 md:h-[60px] mb-6">
                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                value={username}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full h-full px-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                            />
                        </div>
                        <div className="relative w-full h-12 md:h-[60px] mb-6">
                            <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={24} />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-full pl-12 pr-12 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                            />
                            <div
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <AiFillEyeInvisible size={24} /> : <AiFillEye size={24} />}
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-between mb-6">
                            <button
                                onClick={() => router.push("/forgot_password")}
                                className="text-blue-500 hover:text-blue-400"
                            >
                                Forgot password?
                            </button>
                        </div>
                        <button
                            className={`w-full h-12 md:h-14 px-4 py-2 bg-[#166BA0] text-white rounded-lg shadow hover:bg-[#2881b9] mb-4 border-0`}
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className={`text-center ${isDarkMode ? "text-gray-300" : "text-gray-700"} mt-4`}>
                        <span>Do not have an account?</span>
                        <a href="/signup" className="text-blue-500 hover:text-blue-400 ml-1">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
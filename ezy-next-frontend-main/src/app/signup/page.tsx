/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import Image from "next/image";
import { FaFacebookF, FaMoon, FaSun } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Sign from "../../../public/assets/SignUpLogo.png";
import Ezy from "../../../public/assets/ezy.png";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FaKey } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { CgWorkAlt } from "react-icons/cg";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from "../context/AuthContext";
import { ResponseCookies } from "next/dist/compiled/@edge-runtime/cookies";

interface FormErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    organisation?: string;
}


function validatePassword(password) {
    return password.length >= 8 ? null : "Password must be at least 8 characters long";
}

const Home = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const { login } = useAuth();

    const [formData, setUserData] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        organisation: [
            {
                name: ""
            }
        ]
    });

    const [googleSignUp, setGoogleSignUp] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [passwordError, setPasswordError] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);

    const router = useRouter();

const [firstNameError, setFirstNameError] = useState<string | null>(null);
const [lastNameError, setLastNameError] = useState<string | null>(null);
const [emailError, setEmailError] = useState<string | null>(null);


    useEffect(() => {
        const error = validatePassword(formData.password);
        setPasswordError(error);

        error ? setIsDisabled(true) : setIsDisabled(false)
    }, [formData.password]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)

        const email = params.get('email')
        const firstName = params.get('first_name')
        const lastName = params.get('last_name')
        const status = params.get('status')

        if (status && status === '200') {
            setGoogleSignUp(true)

            setUserData({
                ...formData,
                email: email,
                password: "12345678",
                first_name: firstName,
                last_name: lastName
            })
        }

        if (status && status === '400') {
            setGoogleSignUp(false)
            notifyError('This email is already in use. Please use a different email.');
        }
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData({
            ...formData,
            [name]: value
        });

        switch (name) {
            case 'first_name':
                setFirstNameError(validateFirstName(value));
                break;
            case 'last_name':
                setLastNameError(validateLastName(value));
                break;
            case 'email':
                setEmailError(validateEmail(value));
                break;
        }
    };

    const handleOrganisationChange = (e) => {
        const { value } = e.target;
        setUserData({
            ...formData,
            organisation: [
                {
                    name: value
                }
            ]
        });
    };

    const notifySuccess = () => toast.success('Account Created Successfully!');
    const notifyError = (message) => toast.error(message);

    const validateFirstName = (value: string): string | null => {
        if (!value.trim()) return "*First name is required";
        if (value.length < 2) return "*First name must be at least 2 characters long";
        const namePattern = /^[a-zA-Z\s'-]+$/;
        return namePattern.test(value.trim()) ? null : "First name should only contain letters.";
    };
    
    const validateLastName = (value: string): string | null => {
        if (!value.trim()) return "*Last name is required";
        if (value.length < 2) return "*Last name must be at least 2 characters long";
        const namePattern = /^[a-zA-Z\s'-]+$/;
        return namePattern.test(value.trim()) ? null : "Last name should only contain letters.";
    };
    
    const validateEmail = (value: string): string | null => {
        if (!value.trim()) return "*Email is required";
        const localPart = value.split('@')[0];
        if (localPart.length < 2) return "*Email must have at least 2 characters before the '@' symbol";
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (/^\d+$/.test(localPart)) return "Please enter a valid email address";
        return emailPattern.test(value.trim()) ? null : "Please enter a valid email address";
    };
    

    const validateForm = () => {
        const firstNameValid = !validateFirstName(formData.first_name);
    const lastNameValid = !validateLastName(formData.last_name);
    const emailValid = !validateEmail(formData.email);
    return firstNameValid && lastNameValid && emailValid;
};

    const sendUserData = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);
            const response = await fetch('https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.status === 400) {
                console.log(googleSignUp)
                console.log(response)
                if (googleSignUp) {
                    router.push('/login')
                }

                notifyError('You already have an account with that email. Please Login');
                return;
            }

            if (!response.ok) throw new Error('Network response was not ok');
            notifySuccess();
            setUserData({
                email: "", password: "", first_name: "", last_name: "",
                organisation: [{ name: "" }],
            });

            if (googleSignUp) handleGoogleLogin()

            handleLogin()
        } catch (error) {
            console.error('Error:', error);
            notifyError('An error occurred during signup. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = () => {
        try {
            window.location.href = 'https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/signup/google/auth';
        } catch (error) {
            notifyError("Failed to redirect to Google authentication. Please try again.");
        }
    }

    const handleGoogleLogin = () => {
        try {
            window.location.href = 'https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/auth/google';
        } catch (error) {
            console.error("Redirection error:", error);
            alert("Failed to redirect to Google authentication. Please try again.");
        }
    };

    const handleLogin = async () => {
        setLoading(true);

        try {
            const token = await login(formData.email, formData.password);
            if (token) {
                localStorage.setItem("authToken", token);
            }
        } catch (error) {
            console.log("An error occurred during login. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    if (googleSignUp) {
        return (
            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} flex justify-center items-center relative transition-all duration-300 ease-in-out`}>
                <button
                    onClick={toggleDarkMode}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                >
                    {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
                </button>

                <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg p-6 w-96`}>
                    <div className="relative">
                        <input
                            className={`w-full px-8 py-4 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 placeholder-white border-gray-400 focus:border-gray-200' : 'bg-gray-100 placeholder-gray-500 border-gray-200 focus:border-gray-400'} border text-sm focus:outline-none mt-5`}
                            type="text"
                            value={formData.organisation[0].name}
                            onChange={handleOrganisationChange}
                            required
                            placeholder="Organization Name"
                        />
                        <CgWorkAlt className={`absolute bottom-[18px] left-[10px] ${isDarkMode ? 'text-white' : 'text-black'}`} />

                    </div>
                    <button
                        className={`mt-5 tracking-wide font-semibold ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-800'} ${loading || !formData.organisation[0].name.trim()} text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${(loading || !formData.organisation[0].name.trim()) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={sendUserData}
                        disabled={loading || !formData.organisation[0].name.trim()}
                    >
                        {loading ? 'Signing Up...' : 'Complete Sign Up'}
                    </button>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} flex justify-center items-center relative transition-all duration-300 ease-in-out`}>
                <button
                    onClick={toggleDarkMode}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700"
                >
                    {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-700" />}
                </button>

                <div className={`max-w-screen-xl m-0 sm:m-10 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow sm:rounded-lg flex flex-col md:flex-row justify-center flex-1`}>
                    <div className="w-full md:w-2/3 xl:w-1/2 p-6 sm:p-12 flex justify-center items-center">
                        <div className="mt-8 flex flex-col items-center w-full max-w-lg">
                            <h1 className={`text-2xl xl:text-3xl font-extrabold mt-0 text-center`}>Create Account</h1>
                            <div className="w-full mt-8">
                                <div className="flex flex-col md:flex-row items-center gap-4">
                                    <button className={`border w-full max-w-xs font-bold shadow-lg rounded-lg py-3 ${isDarkMode ? 'bg-gray-700' : 'bg-slate-50'} flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none hover:shadow focus:shadow-lg focus:shadow-outline mt-5`}
                                        onClick={handleGoogleSignUp}>
                                        <div className="bg-white p-1 rounded-full">
                                            <FcGoogle />
                                        </div>
                                        <span className="ml-4">Sign Up with Google</span>
                                    </button>

                                    <button className={`border w-full max-w-xs font-bold shadow-lg rounded-lg py-3 ${isDarkMode ? 'bg-gray-700' : 'bg-slate-50'} flex items-center justify-center transition-all duration-200 ease-in-out focus:outline-none hover:shadow focus:shadow-lg focus:shadow-outline mt-5`}>
                                        <div className="bg-white p-1 rounded-full">
                                            <FaFacebookF className="text-blue-600" />
                                        </div>
                                        <span className="ml-4">Sign Up with Facebook</span>
                                    </button>
                                </div>
                                <div className="my-12 border-b text-center">
                                    <div className={`px-2 inline-block ${isDarkMode ? 'text-gray-300 bg-gray-800' : 'text-gray-600 bg-white'} text-sm tracking-wide font-medium transform translate-y-1/2`}>Or sign up with e-mail</div>
                                </div>

                                <div className="max-w-lg">
                                    <div className="flex flex-col sm:flex-row justify-between mt-4">
                                        <div className="w-full sm:w-1/2">
                                            {firstNameError && (
                                                <div className='px-1 mb-1 font-light text-red-600 dark:text-red-400'>
                                                    {firstNameError}
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full sm:w-1/2">
                                            {lastNameError && (
                                                <div className='px-1 mb-1 font-light text-red-600 dark:text-red-400'>
                                                    {lastNameError}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-6 mt-4">
                                        <input
                                            className={`w-full px-5 py-4 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 placeholder-white border-gray-400 focus:border-gray-200' : 'bg-gray-100 placeholder-gray-500 border-gray-200 focus:border-gray-400'} border text-sm focus:outline-none`}
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter First Name"
                                        />

                                        <input
                                            className={`w-full px-5 py-4 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 placeholder-white border-gray-400 focus:border-gray-200' : 'bg-gray-100 placeholder-gray-500 border-gray-200 focus:border-gray-400'} border text-sm focus:outline-none`}
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter Last Name"
                                        />
            
                                    </div>

                                    <div className="relative">
                                        {emailError && (
                                                <div className='px-1  mt-4 font-light text-red-600 dark:text-red-400'>
                                                    {emailError}
                                                </div>
                                            )}
                                        <input
                                            className={`w-full px-8 py-4 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 placeholder-white border-gray-400 focus:border-gray-200' : 'bg-gray-100 placeholder-gray-500 border-gray-200 focus:border-gray-400'} border text-sm focus:outline-none mt-5`}
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="example@gmail.com"
                                        />
                                        <IoMdMail className={`absolute bottom-[18px] left-[10px] ${isDarkMode ? 'text-white' : 'text-black'}`} 
                                        />
                                    </div>

                                    {formData.password && passwordError && (
                                        <div className='px-1 mt-4  mb-1 font-light text-red-600 dark:text-red-400'>
                                            {passwordError}
                                        </div>
                                    )}

                                    <div className="relative">
                                        <input
                                            id="password"
                                            className={`w-full px-8 py-4 rounded-lg font-medium ${(formData.password && passwordError) ? '' : 'mt-4'} ${isDarkMode ? 'bg-gray-700 placeholder-white border-gray-400 focus:border-gray-200' : 'bg-gray-100 placeholder-gray-500 border-gray-200 focus:border-gray-400'} border text-sm focus:outline-none`}
                                            type={isPasswordVisible ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            placeholder="Enter Password"
                                        />
                                        {isPasswordVisible ? (
                                            <IoEyeOff
                                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                                className={`absolute right-4 bottom-[17px] cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}
                                            />
                                        ) : (
                                            <IoEye
                                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                                className={`absolute right-4 bottom-[17px] cursor-pointer ${isDarkMode ? 'text-white' : 'text-black'}`}
                                            />
                                        )}
                                        <FaKey className={`absolute bottom-[18px] left-[10px] ${isDarkMode ? 'text-white' : 'text-black'}`} />
                                    </div>

                                    <div className="relative">
                                        <input
                                            className={`w-full px-8 py-4 rounded-lg font-medium ${isDarkMode ? 'bg-gray-700 placeholder-white border-gray-400 focus:border-gray-200' : 'bg-gray-100 placeholder-gray-500 border-gray-200 focus:border-gray-400'} border text-sm focus:outline-none mt-5`}
                                            type="text"
                                            name="organisation"
                                            value={formData.organisation[0].name}
                                            onChange={handleOrganisationChange}
                                            required
                                            placeholder="Organization Name"
                                        />
                                        <CgWorkAlt className={`absolute bottom-[18px] left-[10px] ${isDarkMode ? 'text-white' : 'text-black'}`} />

                                    </div>

                                    <button
                                        className={`mt-5 tracking-wide font-semibold ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-indigo-600 hover:bg-indigo-800'} ${loading || isDisabled} text-gray-100 w-full py-4 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${(loading || isDisabled) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={sendUserData}
                                        disabled={loading || isDisabled}
                                    >
                                        {loading ? 'Signing Up...' : 'Sign Up'}
                                    </button>
                                </div>
                                <div className="mt-4 flex justify-center items-center">
                                    <p className={`flex ${isDarkMode ? 'text-white' : 'text-black'}`}>
                                        <span>Already have an account?</span>
                                        <a href="/login" className="text-blue-500 hover:underline ml-1">
                                            Login
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex lg:flex-1 bg-indigo-100 text-center justify-center items-center">
                        <div className="m-12 xl:m-16 bg-contain bg-center bg-no-repeat mt-5 items-center inline-block w-full md:w-2/3 lg:w-full">
                            <div className="ml-16">
                                <Image src={Ezy} alt="Ezy Logo" />
                            </div>
                            <Image className="mt-14 w-full md:w-3/4 lg:w-full" src={Sign} alt="Phone Image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;

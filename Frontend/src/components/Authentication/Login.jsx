import React, { useState, useContext } from "react";
import Input from "../utils/Input";
import { Link, Navigate } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(AppContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://127.0.0.1:3000/api/v1/user/login',
                { email, role, password },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            setIsAuthorized(true);
            setUser(response.data.response);
        } catch (err) {
            setIsAuthorized(false);
            console.log("error in logging in : ", err);
        }
    }

    if (isAuthorized) {
        return <Navigate to={'/'} />
    }

    return (
        <section className="h-full bg-neutral-200">
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-2/4">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap flex justify-center items-center">
                                {/* <!-- Left column container--> */}
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        {/* <!--Logo--> */}
                                        <div className="flex flex-col justify-center items-center">
                                            <img width="128" height="128" src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-Job-Search-recruitment-nawicon-outline-color-nawicon.png" alt="Job Finder" />
                                        </div>

                                        <form className="flex flex-col justify-center items-center">
                                            <p className="mb-4 font-bold">Please login to your account</p>
                                            <div className="flex flex-row flex-1 mb-1">
                                                <label>Login As : </label>
                                                <div className="text-black mx-2">
                                                    <select
                                                        value={role}
                                                        onChange={(e) => setRole(e.target.value)}
                                                        className=""
                                                    >
                                                        <option value="Select Role">Select Role</option>
                                                        <option value="Employer">Employer</option>
                                                        <option value="Job Seeker">Job Seeker</option>
                                                    </select>
                                                </div>
                                            </div>
                                            {/* <!--Email input--> */}
                                            <Input
                                                type="text"
                                                id="email"
                                                name="email"
                                                label="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            ></Input>

                                            {/* <!--Password input--> */}
                                            <Input
                                                type="password"
                                                id="password"
                                                name="password"
                                                label="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            ></Input>

                                            {/* <!--Log In button--> */}
                                            <div className="mb-6 pb-1 pt-1 text-center">
                                                <button
                                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                    type="button"
                                                    onClick={handleLogin}
                                                    style={{
                                                        background:
                                                            "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                                    }}
                                                >
                                                    Log in
                                                </button>
                                            </div>

                                            {/* <!--Register button--> */}
                                            <div className="flex items-center justify-between pb-6 w-72">
                                                <p className="mb-0 mr-2">Don't have an account?</p>
                                                <Link to={'/register'}>
                                                    <button
                                                        type="button"
                                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                                    >
                                                        Register
                                                    </button>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;


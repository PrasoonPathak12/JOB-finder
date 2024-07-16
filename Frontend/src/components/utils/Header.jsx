import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

function Header() {
    const { isAuthorized, setIsAuthorized, user, setUser } = useContext(AppContext);
    const navigateTo = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();

        axios.get(
            'http://127.0.0.1:3000/api/v1/user/logout',
            {
                withCredentials: true
            }
        ).then(() => {
            setIsAuthorized(false);
            setUser({});
            navigateTo('/login');
        }).catch((err) => {
            console.log("error logging out : ", err);
        });
    }

    return (
        <>
            <header>
                <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        {/* Logo */}
                        <Link to={'/'} className="flex items-center">
                            <img width="64" height="64" src="https://img.icons8.com/external-nawicon-outline-color-nawicon/64/external-Job-Search-recruitment-nawicon-outline-color-nawicon.png" alt="Job Finder" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">JobFinder</span>
                        </Link>
                        <div className="flex items-center lg:order-2">
                            {
                                isAuthorized ? (
                                    <></>
                                ) : (
                                    <>
                                        {/* Log in button */}
                                        <Link to={'/login'} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                            LOG IN
                                        </Link>

                                        {/* get started */}
                                        <Link to={'/register'} className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                            REGISTER
                                        </Link>
                                    </>
                                )
                            }

                            <button data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                <li>
                                    <Link to={'/'} aria-current='page' className="m-2 block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                        HOME
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/job/all'} className="m-2 block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                        ALL JOBS
                                    </Link>
                                </li>

                                {/* rendering of employer's or job seekers pages */}
                                {
                                    isAuthorized ? (
                                        <>
                                            <li>
                                                <Link to={'/applications/me'} className="m-2 block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                                    {
                                                        user && user.role === 'Employer' ? "APPLICANT'S APPLICATIONS" : "MY APPLICATIONS"
                                                    }
                                                </Link>
                                            </li>
                                            <ul>
                                                {
                                                    user && user.role === 'Employer' ? (
                                                        <>
                                                            <li className="inline-block m-2">
                                                                <Link to={'/job/post'} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                                                    POST NEW JOB
                                                                </Link>
                                                            </li>
                                                            <li className="inline-block m-2">
                                                                <Link to={'/job/me'} className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">
                                                                    VIEW YOUR JOBS
                                                                </Link>
                                                            </li>
                                                        </>
                                                    ) : (<></>)
                                                }
                                            </ul>
                                        </>
                                    ) : <></>
                                }

                                <Link onClick={handleLogout}>
                                    {
                                        isAuthorized ? (
                                            <button className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">
                                                LOGOUT
                                            </button>
                                        ) : <></>
                                    }
                                </Link>

                                <li>
                                    <h3 className="text-white text-lg font-bold mt-2">{user.email ? user.email : ''}</h3>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
}



export default Header;
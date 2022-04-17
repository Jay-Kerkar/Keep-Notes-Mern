import React from 'react'
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import logo from "../resources/logo.png"

const Navbar = (props) => {
    let location = useLocation()
    let navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("authentication_token")
        navigate('/signin')
        props.displayAlert("Logged Out Successfully", "success")
    }
    return (
        <nav className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only"></span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <img src={logo} width={"50px"} alt={"alt"} />
                                <Link to="/" className={`text-white px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/" ? "bg-gray-900" : ""}`} style={{ fontSize: "18px", height: "40px", marginTop: "6px" }} aria-current="page">Home</Link>
                                <Link to="/about" className={`text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium ${location.pathname === "/about" ? "bg-gray-900" : ""}`} style={{ fontSize: "18px", height: "40px", marginTop: "6px" }}>About Us</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        {!localStorage.getItem("authentication_token") ? (<><Link to="/signin" className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2">Sign In</Link><Link to="/signup" className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2" style={{ marginLeft: "20px" }}>Sign Up</Link></>) : (<button onClick={logout} className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center" type="button" id="button-addon2" style={{ marginLeft: "20px" }}>Log Out</button>)}
                    </div>
                </div>
            </div>
            <div className="sm:hidden" id="mobile-menu">
                <div className="px-2 pt-2 pb-3 space-y-1">
                    <Link to="/" className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium" aria-current="page">Home</Link>
                    <Link to="/about" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">About Us</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
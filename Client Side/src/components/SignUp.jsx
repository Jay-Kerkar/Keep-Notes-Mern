import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../resources/logo.png"

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email_id: "", password: "", confirm_password: "" })
    let navigate = useNavigate()

    const submit = async (event) => {
        event.preventDefault()
        const url = "http://localhost:5000/api/authentication/registration"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email_id: credentials.email_id, password: credentials.password })
        })
        const data = await response.json()
        if (data.error) {
            props.displayAlert(data.error, "danger")
        } else {
            // Storing The Authentication Token And Redirecting The User
            localStorage.setItem("authentication_token", data.authentication_token)
            navigate("/")
            props.displayAlert("Account Created Successfully", "success")
        }
    }

    const setValue = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img className="mx-auto h-12 w-auto" src={logo} alt="Workflow" />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create An Account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={submit}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Name</label>
                            <input style={{ margin: '15px 0' }} id="name" name="name" onChange={setValue} type="text" autoComplete="email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter Your Name" required />
                        </div>
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email Address</label>
                            <input style={{ margin: '15px 0' }} id="email_id" name="email_id" onChange={setValue} type="email" autoComplete="email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter Your Email Id" required />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" onChange={setValue} autoComplete="current-password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter Your Password" minLength={8} required />
                            <label htmlFor="password" className="sr-only">Confirm Password</label>
                            <input style={{ marginTop: "15px" }} id="confirm_password" name="confirm_password" onChange={setValue} type="password" autoComplete="current-password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Re-Enter Your Password" minLength={8} required />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                            </span>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
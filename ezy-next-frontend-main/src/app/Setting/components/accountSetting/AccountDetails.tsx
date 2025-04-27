import { useState } from "react";

const AccountDetails = ({ isDarkMode }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        alert('stay tuned, functionality coming soon')
    }

    return (
        <div className={`p-6 max-w-80 mx-auto ${isDarkMode ? "bg-gray-800 text-slate-100" : "bg-white text-gray-900"} rounded-lg shadow-lg `}>
            <form onSubmit={handleSubmit}>
                <h3 className="text-lg font-semibold mb-4">
                    Account Details
                </h3>
                <div>
                    <label className="block mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter Email"
                        className="mb-4 p-2 w-full bg-gray-100 dark:bg-gray-700 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter password"
                        className="mb-4 p-2 w-full bg-gray-100 dark:bg-gray-700 border rounded"
                    />
                </div>
                <div className="flex flex-col sm:flex-row justify-start gap-2 mt-2">
                    <button type="submit" className={`px-4 py-2 ${!isDarkMode ? "bg-gray-800 text-slate-100" : "bg-gray-100 text-gray-900"} rounded w-full md:w-auto`}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AccountDetails
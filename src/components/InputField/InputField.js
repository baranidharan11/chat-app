import { useState } from "react";


export default function InputField({ label, type, name, value, onChange, error, disabled }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";

    return (
        <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <div className="relative w-full">
                <input
                    type={isPassword && !showPassword ? "password" : "text"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-200 
            ${error ? "border-red-500" : "border-gray-300"} 
            ${disabled ? "bg-gray-200" : "bg-white"}`}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-all duration-150"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};
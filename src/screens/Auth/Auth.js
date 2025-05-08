import { useState } from "react";
import { connect } from "react-redux";
import InputField from "../../components/InputField/InputField";
import { logInUser, registerUser } from "../../redux/auth/actions";
import { ToastContainer } from "react-toastify";

const AuthPage = (props) => {
  const [isSignup, setIsSignup] = useState(false); // 👈 Show Login first
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formOnSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      props.signup(formData);
    } else {
      props.login({ email: formData.email, password: formData.password });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-5">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        <form onSubmit={formOnSubmit} className="space-y-4">
          {isSignup && (
            <InputField
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          )}
          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {isSignup && (
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          )}

          <button
            type="submit"
            className={`w-full p-3 text-white font-medium rounded-lg transition-all duration-300 bg-indigo-600 hover:bg-indigo-700`}
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-600 font-semibold cursor-pointer ml-1 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signup: (userData) => registerUser(userData),
  login: (credentials) => logInUser(credentials),
});

export default connect(null, mapDispatchToProps)(AuthPage);

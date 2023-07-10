import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Alert from "../../components/Alert";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repeatPassword].includes("")) {
      setAlert({
        msg: "All fields are required",
        error: true,
      });
      return;
    }
    if (password !== repeatPassword) {
      setAlert({
        msg: "Passwords do not match",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: "Password is too short, please enter at least 6 characters",
        error: true,
      });
      return;
    }
    setAlert({});

    // Create user in the API
    try {
      const response = await axios.post(`http://localhost:4000/api/users`, {
        name,
        email,
        password,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Create Account and Manage Your{" "}
        <span className="text-slate-700">Projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          >
            Name
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Your Name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Registration Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Registration Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          >
            Repeat Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Repeat Your Password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Create Account"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          Already have an account? Log In
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forgot-password"
        >
          Forgot Password
        </Link>
      </nav>
    </>
  );
};

export default Register;

import { useState } from "react";
import { Link } from "react-router-dom";
import clientAxios from "../../config/clientAxios";
import Alert from "../../components/Alert";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        msg: "Email is Required",
        error: true,
      });
      return;
    }

    try {
      const { data } = await clientAxios.post("users/forgot-password", {
        email,
      });

      setAlert({
        msg: data.msg,
        error: false,
      });
      setEmailSent(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Recover your access and don't lose your{" "}
        <span className="text-slate-700">projects</span>
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        {!emailSent && (
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
        )}

        <input
          type="submit"
          value={emailSent ? "Resend email" : "Send Instructions"}
          className={
            emailSent
              ? "bg-white mb-2 w-full py-3 text-slate-700 uppercase font-bold rounded border border-slate-400 hover:cursor-pointer hover:bg-slate-300 transition-colors"
              : "bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          }
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <span className="block text-center my-2">
          <span className="text-gray-500 ">Already have an account? </span>
          <Link to="/" className="text-sky-600">
            Log in
          </Link>
        </span>

        <span className="block text-center my-2">
          <span className="text-gray-500">Don't have an account? </span>
          <Link to="/register" className="text-sky-600">
            Sign up
          </Link>
        </span>
      </nav>
    </>
  );
};

export default ForgotPassword;

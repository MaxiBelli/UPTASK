import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../../components/Alert";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirmed, setAccountConfirmed] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `http://localhost:4000/api/users/confirm/${id}`;
        const { data } = await axios(url);

        setAlert({
          msg: data.msg,
          error: false,
        });
        setAccountConfirmed(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirm Your Account and Start Creating Your {""}
        <span className="text-slate-700">Projects</span>
      </h1>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}

        {accountConfirmed && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;

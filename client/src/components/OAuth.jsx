import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import goog from "/Users/apple/Desktop/Real Estate Project/client/src/assets/icons8-google-48.png";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  }

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-amber-50 text-slate-700 p-3 rounded-lg text-center w-48 flex items-center 
       font-semibold justify-center gap-3 transition-transform duration-300 ease-in-out hover:scale-101 hover:bg-white hover:shadow-md "
    >
      Sign In with <img src={goog} className="w-6 h-6" alt="Google logo" />
    </button>
  );
}

export default OAuth;

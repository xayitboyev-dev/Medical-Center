import { login } from '../../services/auth';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      const { data } = await login({ username: form.get("username"), password: form.get("password"), role: form.get("doctor") ? "doctor" : "user" });
      localStorage.setItem("token", data.token);
      toast.success("Muvvaffaqqiyatli accountga kirdingiz!");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  return (
    <div className='auth_form'>
      <form onSubmit={submitHandler}>
        <Link to="/" className='logo'>
          <img src="/images/logo.png" alt="not found!" />
        </Link>
        <h1>Hisobga kirish</h1>
        <input type="text" name="username" placeholder='Username' required />
        <input type="password" name="password" placeholder='Password' required />
        <div>
          <label htmlFor="checkbox">Shifokormisiz? </label>
          <input type="checkbox" id='checkbox' name="doctor" />
        </div>
        <button type="submit">Login</button>
        <p>Saytda yangimisiz? <Link className='switch' to="/auth/register">Register</Link></p>
      </form>
    </div>
  )
}

export default Login
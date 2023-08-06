import { register } from '../../services/auth';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    const form = new FormData(e.target);

    try {
      const { data } = await register({
        username: form.get("username"),
        password: form.get("password"),
        phone: form.get("phone"),
        name: form.get("name"),
        surname: form.get("surname"),
      });
      localStorage.setItem("token", data.token);
      toast.success(data.message);
      navigate("/auth/login");
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
        <h1>Ro'yxatdan o'tish</h1>
        <input type="text" name="name" placeholder='Ism' minLength="2" maxLength="100" id="name" required />
        <input type="text" name="surname" placeholder='Familiya' minLength="2" maxLength="100" id="surname" required />
        <input type="number" name="phone" placeholder='Telefon raqam' id="phone" required />
        <input type="text" name="username" placeholder='Foydalanuvchi nomi' minLength="5" maxLength="50" id="username" required />
        <input type="password" name="password" placeholder='Parol' minLength="6" id="password" />
        <button type="submit">Submit</button>
        <p>Accountingiz bormi? <Link className='switch' to="/auth/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Register
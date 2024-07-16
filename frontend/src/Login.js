import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import useCheckAuth from "./useCheckAuth";
import axios from "axios"
import { useEffect } from "react";

const Login = () => {
  const data = useActionData()
  const navigate = useNavigate()
  const alertArea = document.querySelector('.alert-area')
  const auth = useCheckAuth()

  useEffect(() => {
    if (auth) {
      navigate('/dashboard')
    }
  }, [])
  
  if (data) {
    if (data.status) {
      localStorage.setItem('username', JSON.stringify(data.user.user.name))
      navigate('/dashboard')
    } else {
      alertArea.innerHTML = `<div className="alert">
      ${data.message}
      </div>`
    }
  }
  return (
    <div className="login">

      <Form className="form" method="post" action="/login">
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input type="email" name="email" placeholder="Enter email" />
          <span>
          </span>
        </div>
        <div className="input-container">
          <input type="password" name="password" placeholder="Enter password" />
        </div>
        <div className="alert-area"></div>
        <button type="submit" className="submit">
          Sign in
        </button>

        <p className="signup-link">
          No account? &nbsp;
          <Link to="/register">Sign up</Link>
        </p>
      </Form>

    </div>
  );
}

export const handleLogin = async ({ request }) => {
  const data = await request.formData()
  const email = data.get('email')
  const password = data.get('password')
  try {
    const response = await axios.post('https://basic-login-api.vercel.app/login', { email, password })
    return response.data
  } catch (error) {
    return { status: false, message: error.message }
  }
}

export default Login;

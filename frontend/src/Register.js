import axios from "axios"
import { useEffect } from "react";
import { Link, Form, useActionData, useNavigate } from "react-router-dom";
import useCheckAuth from "./useCheckAuth";

const Register = () => {
  const navigate = useNavigate()
  const auth = useCheckAuth()
  useEffect(() => {
    if (auth) {
      navigate('/dashboard')
    }
  }, [])

  const data = useActionData()
  const alertArea = document.querySelector('.alert-area')

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
    <div className="register" >

      <Form className="form" method="post" action="/register">
        <p className="form-title">Register an account</p>
        <div className="input-container">
          <input type="text" name="name" placeholder="Enter name" />
          <span>
          </span>
        </div>
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
          Sign Up
        </button>

        <p className="signup-link">
          Already have an account? &nbsp;
          <Link to="/login">Sign in</Link>
        </p>
      </Form>

    </div>
  );


}

export const handleRegistration = async ({ request }) => {
  const data = await request.formData()
  const name = data.get('name')
  const email = data.get('email')
  const password = data.get('password')
  try {
    const response = await axios.post('https://basic-login-api.vercel.app/register', { name, email, password })
    return response.data
  } catch (error) {
    return { status: false, message: error.message }
  }
}

export default Register;

import { Link, useNavigate } from "react-router-dom";
import useCheckAuth from "./useCheckAuth";
import { useEffect } from "react";

const Options = () => {
    const navigate = useNavigate()
    const auth = useCheckAuth()
    useEffect(() => {
        if (auth) {
          navigate('/dashboard')
        }
      }, [])
    return (
        <div className="options">
           <Link to="/login"><button className="btn">Sign In</button></Link>
           <Link to="/register"><button className="btn">Sign Up</button></Link>
        </div>
    );
}
 
export default Options;
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCheckAuth from "./useCheckAuth";

const Dashboard = () => {
    const [name, setName] = useState('')
    const navigate = useNavigate()
    const auth = useCheckAuth()
    useEffect(() => {
        if (!auth) {
            navigate('/')
        }
    }, [])
    useEffect(() => {
        const daName = localStorage.getItem('username')
        setName(daName)
    }, [])

    const handleClick = () => {
        localStorage.removeItem('username')
        navigate("/")
    }
   
    return (
        <div className="dashboard">
            <h1>Hello {name}!</h1>
            <button onClick={handleClick} className="btn">Log out</button>
        </div>
    );
}
 
export default Dashboard;
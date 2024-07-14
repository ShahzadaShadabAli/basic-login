import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Layout from "./Layout";
import Login, { handleLogin } from "./Login";
import Register, { handleRegistration } from "./Register";
import Options from "./Options";
import Dashboard from "./Dashboard";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Options />} />
        <Route path="login" action={handleLogin} element={<Login />} />
        <Route path="register" action={handleRegistration} element={<Register />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    )
  )
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

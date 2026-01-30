import Login from "../src/pages/Login";

function ProtectedRoute({children}){

    const token = localStorage.getItem("token");

    if(!token){

        return <Login/>
    }

    return children;
}

export default ProtectedRoute;
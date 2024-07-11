import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/getCookie";

function PrivateRoutes() {

    const isLogin = getCookie("token");

    return (<>
     {isLogin ? (<Outlet />) : (<Navigate to="/login"/>)}
    </>)
}

export default PrivateRoutes;
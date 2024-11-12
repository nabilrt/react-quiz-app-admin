import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../lib/context/auth-context";
import AuthSidebar from "../components/AuthSidebar";

export default function PrivateOutlet() {
    const { authenticated } = useAuth();

    return authenticated ? (
        <div className="font-inter grid grid-cols-[13%_82%]">
            <AuthSidebar />
            <Outlet />
        </div>
    ) : (
        <Navigate to="/login" />
    );
}

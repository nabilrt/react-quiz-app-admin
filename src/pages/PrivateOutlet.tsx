import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../lib/context/auth-context";
import AuthSidebar from "../components/AuthSidebar";
import { useState } from "react";

export default function PrivateOutlet() {
    const { authenticated } = useAuth();
    const [expanded, setExpanded] = useState(true);

    return authenticated ? (
        <div className="font-inter flex min-h-screen ">
            <AuthSidebar expanded={expanded} setExpanded={setExpanded} />
            <div
                className={`flex-1 p-6 transition-all duration-300 ${
                    expanded ? "ml-64" : "ml-20"
                }`}
            >
                <Outlet />
            </div>
        </div>
    ) : (
        <Navigate to="/login" />
    );
}

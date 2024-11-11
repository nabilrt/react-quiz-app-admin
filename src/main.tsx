import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
    BrowserRouter,
    createBrowserRouter,
    RouterProvider,
    Routes,
} from "react-router-dom";
import HomePage from "./pages/Homepage.tsx";
import QuizPage from "./pages/Quiz.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/quiz/:lang",
        element: <QuizPage />,
    },
]);
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

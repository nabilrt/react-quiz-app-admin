import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./lib/context/auth-context";
import Login from "./pages/Login";
import PrivateOutlet from "./pages/PrivateOutlet";
import QuizPage from "./pages/Quiz";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/SettingsPage";
import QuizIndex from "./pages/QuizIndex";
import UserDashboard from "./pages/Dashboard";
import QuestionManagement from "./pages/Questions";
import NotFoundPage from "./pages/NotFoundPage";
import IssuesPage from "./pages/Issues";
import Testimonial from "./pages/Testimonial";

function App() {
    return (
        <>
            <AuthContextProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/admin/*" element={<PrivateOutlet />}>
                        <Route path="dashboard" element={<UserDashboard />} />
                        <Route path="quiz" element={<QuizIndex />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="issues" element={<IssuesPage />} />
                        <Route path="testimonial" element={<Testimonial />} />
                        <Route path="quiz/:id" element={<QuizPage />} />
                        <Route
                            path="quiz/:id/:categoryId"
                            element={<QuestionManagement />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </AuthContextProvider>
        </>
    );
}

export default App;

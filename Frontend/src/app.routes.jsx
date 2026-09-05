import { createBrowserRouter } from "react-router-dom"
import Login from "./Features/auth/pages/login.jsx"
import Register from "./Features/auth/pages/register.jsx"
import Protected from "./Features/auth/components/protected.jsx"
import Home from "./Features/interview/pages/home.jsx"
import InterviewStrategy from "./Features/interview/pages/interview.jsx";
import Reports from "./Features/interview/pages/reports.jsx"
import Profile from "./Features/profile/pages/profile.jsx"
import UpdateProfile from "./Features/profile/pages/updateProfile.jsx"
import Settings from "./Features/settings/pages/settings.jsx"
import MockInterview from "./Features/interview/pages/mockInterview.jsx"
import InterviewResults from "./Features/interview/pages/interviewResults.jsx"
import MockInterviewReports from "./Features/interview/pages/mockInterviewReports.jsx"
import ForgotPassword from "./Features/auth/pages/forgotPassword.jsx"
import ResetPassword from "./Features/auth/pages/resetPassword.jsx"
import ChangePassword from "./Features/auth/pages/changePassword.jsx"
import CareerMentor from "./Features/chatbot/pages/careerMentor.jsx"


export const router=createBrowserRouter([
    {
        path : "/login",
        element : <Login/>
    },
    {
        path : "/register",
        element: <Register/>
    },
    {
        path:"/",
        element:(
            <Protected>
                <Home />
            </Protected>
        )
    },
    {
        path: "/interview/:interviewId",
        element:(
            <Protected>
                <InterviewStrategy />
            </Protected>
        )
    },
    {
        path: "/reports",
        element: (
            <Protected>
                <Reports />
            </Protected>
        )
    },
    {
        path: "/profile",
        element : (
            <Protected>
                <Profile/>
            </Protected>
        )
    },
    {
        path : "/update-profile",
        element:(
            <Protected>
                <UpdateProfile/>
            </Protected>
        )
    },
    {
        path: "/settings",
        element:(
            <Protected>
                <Settings/>
            </Protected>
        )
    },
    {
        path: "/mock-interview/:mockInterviewId",
        element:(
            <Protected>
                <MockInterview/>
            </Protected>
        )
    },
    {
        path: "/interview-results/:mockInterviewId",
        element:(
            <Protected>
                <InterviewResults/>
            </Protected>
        )
    },
    {
        path: "/mock-interview-reports",
        element:(
            <Protected>
                <MockInterviewReports/>
            </Protected>
        )
    }, 
    {
        path: "/forgot-password",
        element: <ForgotPassword/>
    }, 
    {
        path: "/reset-password/:token",
        element: <ResetPassword/>
    },
    {
        path: "/change-password",
        element: (
            <Protected>
                <ChangePassword/>
            </Protected>
        )
    },
    {
        path: "/chat",
        element: (
            <Protected>
                <CareerMentor/>
            </Protected>
        )
    },
])
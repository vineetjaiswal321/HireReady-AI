import { createBrowserRouter } from "react-router-dom"
import Login from "./Features/auth/pages/login.jsx"
import Register from "./Features/auth/pages/register.jsx"
import Protected from "./Features/auth/components/protected.jsx"
import Home from "./Features/interview/pages/home.jsx"
import InterviewStrategy from "./Features/interview/pages/interview.jsx";
import { InterviewProvider } from "./Features/interview/interview.context.jsx"
import Reports from "./Features/interview/pages/reports.jsx"
import Profile from "./Features/profile/pages/profile.jsx"
import UpdateProfile from "./Features/profile/pages/updateProfile.jsx"
import Settings from "./Features/settings/pages/settings.jsx"

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
                <InterviewProvider>
                    <Home />
                </InterviewProvider>
            </Protected>
        )
    },
    {
        path: "/interview/:interviewId",
        element:(
            <Protected>
                <InterviewProvider>
                    <InterviewStrategy />
                </InterviewProvider>
            </Protected>
        )
    },
    {
        path: "/reports",
        element: (
            <Protected>
                <InterviewProvider>
                    <Reports />
                </InterviewProvider>
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
    }
])
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes.jsx";

import { AuthProvider } from "./Features/auth/auth.context.jsx";
import { InterviewProvider } from "./Features/interview/interview.context.jsx";
import { ThemeProvider } from "./Features/context/themeContext.jsx";

function App() {

    return (

        <ThemeProvider>

            <AuthProvider>

                <InterviewProvider>

                    <RouterProvider router={router} />

                </InterviewProvider>

            </AuthProvider>

        </ThemeProvider>

    );
}


export default App;
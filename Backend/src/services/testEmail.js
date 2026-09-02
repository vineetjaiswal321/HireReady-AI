import "dotenv/config";
import sendEmail from "../utils/sendEmail.js";

const test = async () => {
    try {
        await sendEmail({
            to: "vineetjaiswal080@gmail.com",
            subject: "HireReady-AI Email Test",
            text: "Email system is working!",
            html: `
                <h2>HireReady-AI</h2>
                <p>Email system is working!</p>
                <p>Your email configuration is working correctly.</p>
            `,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email failed:", error);
    }
};

test();
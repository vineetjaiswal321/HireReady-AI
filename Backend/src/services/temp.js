// Sample Resume
const resume = {
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91-9876543210",
    location: "Noida, India",

    summary:
        "Computer Science graduate and aspiring Full Stack Developer with hands-on experience building web applications using React, Node.js, Express, and MongoDB. Strong understanding of data structures, REST APIs, authentication, and problem solving.",

    education: [
        {
            degree: "B.Tech in Computer Science and Engineering",
            institution: "ABC Institute of Technology",
            year: 2026,
            cgpa: 8.2
        }
    ],

    skills: {
        languages: ["JavaScript", "Java", "HTML", "CSS"],
        frontend: ["React.js", "Redux", "Tailwind CSS"],
        backend: ["Node.js", "Express.js", "REST APIs"],
        database: ["MongoDB", "Mongoose"],
        tools: ["Git", "GitHub", "VS Code", "Postman"]
    },

    projects: [
        {
            name: "HireReady AI",
            description:
                "An AI-powered interview preparation platform that analyzes a candidate's resume, self-description, and job description to generate interview questions, identify skill gaps, and create a personalized preparation plan.",
            technologies: [
                "React",
                "Node.js",
                "Express",
                "MongoDB",
                "Zod",
                "Google Gemini API"
            ]
        },
        {
            name: "Expense Splitting App",
            description:
                "A full-stack application for managing shared expenses, calculating individual balances, and optimizing debt settlement between users.",
            technologies: [
                "React",
                "Node.js",
                "Express",
                "MongoDB"
            ]
        }
    ],

    experience: [
        {
            role: "Software Development Intern",
            company: "Tech Solutions Pvt. Ltd.",
            duration: "Jan 2026 - Jun 2026",
            responsibilities: [
                "Developed REST APIs using Node.js and Express.js.",
                "Built reusable React components for internal dashboards.",
                "Worked with MongoDB and Mongoose for data management.",
                "Fixed bugs and improved application performance."
            ]
        }
    ]
};


// Self Description
const selfDescription = `
I am a Computer Science graduate interested in full-stack web development.
I enjoy building practical applications and solving programming problems.

My strongest technologies are JavaScript, React, Node.js, Express, and MongoDB.
I have also worked with Java and regularly practice data structures and algorithms.

I recently built an AI-powered interview preparation platform called HireReady AI.
The application analyzes a candidate's resume and job description, generates
technical and behavioral interview questions, identifies skill gaps, and creates
a personalized preparation plan.

I am comfortable developing REST APIs, implementing authentication using JWT and
cookies, designing MongoDB schemas, and connecting frontend applications with
backend services.

I am currently looking for a Full Stack Developer role where I can strengthen
my software engineering skills and contribute to real-world products.
`;


// Job Description
const jobDescription = `
Job Title: Full Stack Developer

Company: TechNova Solutions

Location: Bangalore / Remote

About the Role:
We are looking for an entry-level Full Stack Developer to join our engineering
team. The candidate will work on building scalable web applications and REST APIs
while collaborating with frontend and backend engineers.

Responsibilities:
- Develop responsive web applications using React.js.
- Build and maintain backend services using Node.js and Express.js.
- Design and consume REST APIs.
- Work with MongoDB or other NoSQL databases.
- Implement authentication and authorization.
- Write clean, maintainable, and reusable code.
- Debug application issues and improve performance.
- Collaborate with developers, designers, and product managers.
- Participate in code reviews and technical discussions.
- Write basic unit and integration tests.

Required Skills:
- Strong knowledge of JavaScript.
- Good understanding of React.js.
- Familiarity with Node.js and Express.js.
- Understanding of REST APIs and HTTP.
- Basic knowledge of MongoDB.
- Knowledge of Git and GitHub.
- Understanding of data structures and algorithms.
- Good problem-solving and communication skills.

Preferred Skills:
- TypeScript.
- Redux.
- Docker.
- Redis.
- Experience with AI APIs such as Google Gemini or OpenAI APIs.
- Familiarity with cloud platforms.

What We Offer:
- Mentorship from experienced engineers.
- Opportunity to work on production applications.
- Learning and professional development opportunities.
- Flexible work environment.
`;

export {
    resume,
    selfDescription,
    jobDescription
};
# QuizMate-AI-based-quiz-plateform

# **AI Quiz Generator & Management System**

🔗 **[Live Demo](https://your-demo-link.com)**  

An **AI-powered quiz generator and management platform** where users can create quizzes, students can attempt them, and quiz creators can view all responses with rankings.  
Built with **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

---

## **Features**

###  **Authentication & Security**
- **JWT-based Authentication**: Secure login & signup with token stored in HTTP-only cookies.
- **Password Hashing with bcrypt**: Secure user password storage.
- **Protected Routes**: Only authenticated users can create quizzes or view responses.

---

###  **Quiz Management**
- **Create Quiz**: Users can create quizzes by specifying class and topics.
  - AI-powered question generation (with fallback to sample questions if AI fails).
- **View All Quizzes**: Quizzes displayed with sorting options (Newest/Oldest).
- **Delete Quiz**: Only the quiz creator can delete their quiz.

---

###  **Quiz Attempt**
- **Student Details Before Start**: Students must enter their name & email before attempting the quiz.
- **Timer Per Question**: Each question has a countdown timer.
- **Single Question at a Time**: Clean UI for answering questions sequentially.
- **Submit Quiz**:
  - Calculates **score & percentage**.
  - Displays **detailed report with correct answers**.
- **Responsive Design**: Optimized for both desktop & mobile.

---

###  **Responses Management**
- **Store Responses**: Each student’s answers, name, email, and score are stored in the database.
- **View Responses (Creator Only)**:
  - Lists all students who attempted the quiz.
  - Displays rank-wise order (**highest score first**).
  - **View Details** button to see each student’s answers and correct answers.

---

###  **User Dashboard (Optional Future Feature)**
- Track all created quizzes.
- View performance analytics of quizzes.

---

## ** Tech Stack**

### **Frontend**
- React.js  
- React Router DOM  
- Axios  
- Tailwind CSS  
- Context API (Authentication State)  

### **Backend**
- Node.js  
- Express.js  
- JWT (**jsonwebtoken**)  
- bcrypt  
- cookie-parser  
- dotenv  

### **Database**
- MongoDB  
- Mongoose  

---


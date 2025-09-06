import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreateQuiz from '../pages/CreateQuiz';
import QuizDetails from '../pages/QuizDetails';
import SubmitQuiz from '../pages/SubmitQuiz';
import Navbar from '../components/Navbar';
import ProtectedRoute from './ProtectedRoute';
import ResponsesPage from '../pages/ResponsesPage';
import ResponseDetail from '../pages/ResponseDetail';

export default function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/quiz/create"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />
        <Route path="/quiz/:id" element={<QuizDetails />} />
        <Route path="/quiz/:id/submit" element={<SubmitQuiz />} />
        <Route path="/quiz/:id/responses" element={<ResponsesPage />} />
        <Route path="/quiz/:quizId/responses/:responseId" element={<ResponseDetail />} />

      </Routes>
    </Router>
  );
}

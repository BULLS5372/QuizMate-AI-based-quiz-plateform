// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import QuizForm from './components/QuizForm';
// import QuizPage from './pages/QuizPage';
// import ResultPage from './pages/ResultPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/create-quiz" element={<QuizForm />} /> {/* Added this route */}
//         <Route path="/quiz" element={<QuizPage />} />
//         <Route path="/result" element={<ResultPage/>}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import AppRoutes from './routes/AppRoutes';

function App() {
  return <AppRoutes />;
}

export default App;

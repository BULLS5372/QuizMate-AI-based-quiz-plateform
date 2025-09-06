import Quiz from '../models/Quiz.js';
import { generateQuestions } from '../utils/api.js';
import QuizResponse from '../models/QuizResponse.js';


export const createQuiz = async (req, res) => {
  const { stu_class, known_topics } = req.body;

  try {
    // Validate input
    if (!stu_class || typeof stu_class !== 'string') {
      return res.status(400).json({ message: 'stu_class is required and must be a string' });
    }
    if (known_topics && !Array.isArray(known_topics)) {
      return res.status(400).json({ message: 'known_topics must be an array' });
    }

    // Generate questions from AI API
    let questions = [];
    try {
      questions = await generateQuestions({ stu_class, known_topics: known_topics || [] });
    } catch (error) {
      console.error('AI API error:', error.message);
    }

    // Fallback if no questions returned
    if (!Array.isArray(questions) || questions.length === 0) {
      questions = [
        { question: `${stu_class} sample question?`, options: ['A', 'B', 'C', 'D'], answer: 'A' }
      ];
    }

    // Create title from stu_class and topics
    const topicsPart = (known_topics || []).slice(0, 3).join(', ');
    const title = topicsPart ? `Quiz for ${stu_class} – ${topicsPart}` : `General Quiz – ${stu_class}`;

    // Create quiz
    const quiz = await Quiz.create({
      title,
      stu_class,
      known_topics: known_topics || [],
      questions,
      createdBy: req.user || null
    });

    res.status(201).json({
      message: 'Quiz created successfully',
      quiz: {
        id: quiz._id,
        title: quiz.title,
        stu_class: quiz.stu_class,
        known_topics: quiz.known_topics,
        totalQuestions: quiz.questions.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const getQuizzes = async (req, res) => {
//   try {
//     const quizzes = await Quiz.find().select('title stu_class').lean();
//     res.json(
//       quizzes.map(q => ({
//         id: q._id,
//         title: q.title,
//         stu_class: q.stu_class
//       }))
//     );
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .select('title stu_class createdAt createdBy') // Include createdAt and createdBy
      .populate('createdBy', 'name') // Only get the user's name
      .sort({ createdAt: 1 }) // Sort ascending by default
      .lean();

    res.json(
      quizzes.map(q => ({
        id: q._id,
        title: q.title,
        stu_class: q.stu_class,
        createdAt: q.createdAt,
        createdBy: q.createdBy?.name || 'Unknown'
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// export const getQuizById = async (req, res) => {
//   try {
//     const quiz = await Quiz.findById(req.params.id);
//     if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

//     res.json({
//       id: quiz._id,
//       title: quiz.title,
//       stu_class: quiz.stu_class,
//       known_topics: quiz.known_topics,
//       questions: quiz.questions.map(q => ({
//         question: q.question,
//         options: q.options // Do not expose answer
//       }))
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'name');

    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    res.json({
      id: quiz._id,
      title: quiz.title,
      stu_class: quiz.stu_class,
      known_topics: quiz.known_topics,
      createdAt: quiz.createdAt,
      createdBy: quiz.createdBy?.name || 'Unknown',
      questions: quiz.questions.map(q => ({
        question: q.question,
        options: q.options // Do not expose answer
      }))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const submitQuiz = async (req, res) => {
  try {
    const { studentName, studentEmail, answers } = req.body; 
    const quizId = req.params.id;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    let score = 0;
    const correctAnswers = {};

    quiz.questions.forEach(q => {
      correctAnswers[q.question] = q.answer;
      if (answers[q.question] && answers[q.question] === q.answer) {
        score++;
      }
    });

    // Save response in QuizResponse collection
    const response = new QuizResponse({
      quizId,
      studentName,
      studentEmail,
      answers,
      score,
    });
    await response.save();

    res.status(201).json({
      message: 'Quiz submitted successfully',
      score,
      total: quiz.questions.length,
      correctAnswers
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteQuiz = async (req, res) => {
    try {
      // console.log("deleteQuiz called with id:", req.params.id);
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        // Check if the logged-in user is the creator
        if (quiz.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this quiz' });
        }

        await quiz.deleteOne();
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Get all responses for a quiz (sorted by score)
export const getQuizResponses = async (req, res) => {
  try {
    const { id } = req.params;
    const responses = await QuizResponse.find({ quizId: id }).sort({ score: -1 });

    if (!responses.length) {
      return res.status(404).json({ message: 'No responses found for this quiz' });
    }

    res.json({ responses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single response detail
export const getResponseDetail = async (req, res) => {
  try {
    const { responseId } = req.params;
    const response = await QuizResponse.findById(responseId);

    if (!response) {
      return res.status(404).json({ message: 'Response not found' });
    }

    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


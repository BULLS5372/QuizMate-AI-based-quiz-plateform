import axios from 'axios';

export const generateQuestions = async ({ stu_class, known_topics }) => {
  try {
    const aiRes = await axios.post('https://ai.wizzlearn.com/ai/first-quize', {
      stu_class,
      known_topics
    }, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 8000
    });

    const quizData = aiRes.data?.data || {};
    const questions = Object.values(quizData).map(q => ({
      question: q.question,
      options: q.options,
      answer: q.answer
    }));

    return questions;
  } catch (err) {
    console.error('AI API error:', err);
    // fallback in case API fails
    return [
      {
        question: `${stu_class} sample question?`,
        options: ['A', 'B', 'C', 'D'],
        answer: 'A'
      }
    ];
  }
};

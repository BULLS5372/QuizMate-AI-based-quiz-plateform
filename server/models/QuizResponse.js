import mongoose from 'mongoose';

const quizResponseSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  studentName: { type: String, required: true },
  studentEmail: { type: String, required: true },
  answers: { type: Object, required: true },
  score: { type: Number, default: 0 },
  submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('QuizResponse', quizResponseSchema);

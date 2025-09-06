import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String
});

const quizSchema = new mongoose.Schema({
  title: String,
  stu_class: String,
  known_topics: [String],
  questions: [questionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quiz', quizSchema);


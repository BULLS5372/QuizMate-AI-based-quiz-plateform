export default function QuestionCard({ question, index, selectedOption, onOptionSelect }) {
  return (
    <div className="border rounded-lg p-4 mb-4 bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">
        Q{index + 1}. {question.question}
      </h3>
      <div className="space-y-2">
        {question.options.map((option, idx) => (
          <label
            key={idx}
            className={`block p-2 rounded cursor-pointer ${
              selectedOption === option
                ? 'bg-blue-500 text-white'
                : 'bg-white border hover:bg-gray-100'
            }`}
          >
            <input
              type="radio"
              name={`question-${index}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => onOptionSelect(index, option)}
              className="hidden"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}

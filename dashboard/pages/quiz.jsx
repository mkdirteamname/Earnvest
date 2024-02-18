import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';

const InvestorPersonalityQuiz = () => {
 const [options, setOptions] = useState({ "1": 0, "2": 0, "3": 0 });
  const [personality, setPersonality] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

    const questions = [
    "1. What is your preferred investment horizon?",
    "2. How do you react to market fluctuations?",
    "3. What is your risk tolerance?",
    "4. How much time are you willing to dedicate to managing your investments?",
    "5. What is your attitude towards diversification?",
    "6. How do you approach new investment opportunities?",
    "7. What is your view on short-term vs. long-term gains?",
  ];

  const personalityTraits = {
    "Conservative": "You prefer a cautious approach to investing, focusing on capital preservation. Your primary goal is to avoid significant losses, favoring stable and low-risk investments like bonds or blue-chip stocks. While your strategy might result in slower but steadier returns, it aligns with a prudent approach to financial security and stability.",
    "Moderate": "A dominant personality of Moderate indicates that you have a balanced approach to investing, seeking a mix of both growth and stability. You are willing to take on moderate levels of risk to potentially achieve higher returns. Diversification plays a crucial role in your investment strategy, as you aim to spread risk across different asset classes. Your attitude towards market fluctuations is measured, allowing you to participate in market opportunities while maintaining a level of caution.",
    "Aggressive": "If your dominant personality is Aggressive, you display a high-risk tolerance and a willingness to pursue potentially higher returns, even if it means navigating through increased market volatility. You likely favor dynamic investment opportunities, such as growth stocks, venture capital, or alternative investments. Your focus is on maximizing returns over a shorter time frame, and you may actively seek out emerging trends and opportunities. While your strategy involves a higher level of risk, it reflects a proactive stance towards capitalizing on market dynamics and pursuing substantial long-term gains.",
    "Conservative-Moderate": "You show a mix of conservative and moderate traits, emphasizing both capital preservation and a willingness to explore moderate-risk opportunities. Your investment approach seeks a balance between stability and potential growth.",
    "Moderate-Aggressive": "A blend of moderate and aggressive traits defines your investing style. While you maintain a balanced approach, you also demonstrate a willingness to take on higher risks for the potential of substantial returns. Your strategy involves a combination of stability and proactive exploration of market opportunities.",
    "Aggressive-Conservative": "Your investing personality reflects a unique combination of aggressive and conservative elements. While you have a preference for high-risk opportunities, you also value capital preservation. This approach may involve a mix of dynamic investments and a focus on stable, low-risk assets.",
    "Default": "Your investing personality combines various traits, and there is no specific category that perfectly describes your approach. You may have a unique blend of preferences when it comes to investment horizon, risk tolerance, and strategy."
  };

  const handleNextQuestion = () => {
  if (currentQuestionIndex < questions.length -  1) {
    setCurrentQuestionIndex(currentQuestionIndex +  1);
  } else {
    handleSubmitQuiz(); // Call handleSubmitQuiz instead of setting quizEnded to true
  }
};

const handleSubmitQuiz = () => {
  const mostCommonAnswer = Math.max(...Object.values(options));
  let calculatedPersonality = 'Default';

  for (const [key, value] of Object.entries(options)) {
    if (value === mostCommonAnswer) {
      calculatedPersonality = key;
      break;
    }
  }

  setPersonality(calculatedPersonality);
  setQuizEnded(true); // Set quizEnded to true to show the result
};

// Function to restart the quiz
const restartQuiz = () => {
  setOptions({ "1":  0, "2":  0, "3":  0 });
  setPersonality(null);
  setCurrentQuestionIndex(0);
  setQuizEnded(false);
};


  return (
 <div className="container mx-auto px-4">
  <Navbar />
  <div className="flex flex-col items-center justify-center min-h-screen">
    {quizEnded ? (
      <div className="text-center">
 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={restartQuiz}>Take the Quiz from Start</button>
       <h2 className="text-2xl font-bold mb-4">Your Personality: {personalityTraits[personality]}</h2>
      </div>
    ) : (
      <div className="flex-col text-center">
        <h2 className="text-2xl font-bold mb-4">{questions[currentQuestionIndex]}</h2>
        {/* Add radio buttons for each option */}
        <div className="space-y-2">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name={`question-${currentQuestionIndex}`}
              value="1"
              className="form-radio text-blue-500"
              checked={options[currentQuestionIndex] ===  1}
              onChange={(e) => setOptions({ ...options, [currentQuestionIndex]: parseInt(e.target.value) })}
            />
            <span className="ml-2">Conservative</span>
          </label>
          <label className="inline-flex items-center p-4">
            <input
              type="radio"
              name={`question-${currentQuestionIndex}`}
              value="2"
              className="form-radio text-blue-500"
              checked={options[currentQuestionIndex] ===  2}
              onChange={(e) => setOptions({ ...options, [currentQuestionIndex]: parseInt(e.target.value) })}
            />
            <span className="ml-2">Moderate</span>
          </label>
          <label className="inline-flex items-center p-4">
            <input
              type="radio"
              name={`question-${currentQuestionIndex}`}
              value="3"
              className="form-radio text-blue-500"
              checked={options[currentQuestionIndex] ===  3}
              onChange={(e) => setOptions({ ...options, [currentQuestionIndex]: parseInt(e.target.value) })}
            />
            <span className="ml-2">Aggressive</span>
          </label>
        </div>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleNextQuestion}>Next Question</button>
        {currentQuestionIndex === questions.length -  1 && (
          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4" onClick={handleSubmitQuiz}>Submit</button>
        )}
      </div>
    )}
  </div>
</div>

);
};

export default InvestorPersonalityQuiz;

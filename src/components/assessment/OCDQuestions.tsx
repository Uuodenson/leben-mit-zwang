'use client';

import { db } from '@/lib/api/firebase';
import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';

interface OCDQuestion {
  id: number;
  text: string;
  category: string;
}

const questions: OCDQuestion[] = [
  // Contamination OCD
  { id: 1, text: "I spend a lot of time cleaning or washing to avoid contamination", category: "contamination" },
  { id: 2, text: "I worry excessively about germs and diseases", category: "contamination" },
  { id: 3, text: "I avoid touching certain objects or surfaces due to contamination fears", category: "contamination" },
  
  // Checking OCD
  { id: 4, text: "I repeatedly check things like locks, switches, or appliances", category: "checking" },
  { id: 5, text: "I need to check and recheck to ensure nothing bad will happen", category: "checking" },
  { id: 6, text: "I retrace my steps to make sure I haven't harmed anyone", category: "checking" },
  
  // Symmetry OCD
  { id: 7, text: "I need things to be arranged in a particular order", category: "symmetry" },
  { id: 8, text: "I feel distressed when objects aren't perfectly aligned", category: "symmetry" },
  { id: 9, text: "I spend excessive time making things symmetrical or balanced", category: "symmetry" },
  
  // Intrusive Thoughts
  { id: 10, text: "I experience unwanted, disturbing thoughts that won't go away", category: "intrusive" },
  { id: 11, text: "I have distressing thoughts that go against my values", category: "intrusive" },
  { id: 12, text: "I try to suppress or neutralize disturbing thoughts", category: "intrusive" },
  
  // Hoarding
  { id: 13, text: "I find it difficult to discard items, even if they're not needed", category: "hoarding" },
  { id: 14, text: "I collect items excessively and feel anxious about discarding them", category: "hoarding" },
  { id: 15, text: "My living space is cluttered with items I can't part with", category: "hoarding" },
];

interface OCDQuestionsProps {
  user: User;
  onComplete: () => void;
}

export default function OCDQuestions({ user, onComplete }: OCDQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = async (value: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setLoading(true);
      try {
        // Calculate results
        const results = calculateResults(newAnswers);
        
        // Save to Firestore
        await setDoc(doc(db, "users", user.uid), {
          ocdAssessment: {
            answers: newAnswers,
            results,
            timestamp: new Date().toISOString(),
          }
        }, { merge: true });

        setShowResults(true);
      } catch (error) {
        console.error("Error saving assessment:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const calculateResults = (answers: { [key: number]: number }) => {
    const scores: { [key: string]: { score: number; count: number } } = {
      contamination: { score: 0, count: 0 },
      checking: { score: 0, count: 0 },
      symmetry: { score: 0, count: 0 },
      intrusive: { score: 0, count: 0 },
      hoarding: { score: 0, count: 0 },
    };

    questions.forEach(q => {
      if (answers[q.id]) {
        scores[q.category].score += answers[q.id];
        scores[q.category].count++;
      }
    });

    const results = Object.entries(scores).map(([category, data]) => ({
      category,
      averageScore: data.count > 0 ? data.score / data.count : 0,
    }));

    return {
      scores: results,
      primaryType: results.reduce((a, b) => 
        a.averageScore > b.averageScore ? a : b
      ).category,
    };
  };

  if (showResults) {
    const results = calculateResults(answers);
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Assessment Results</h2>
        <div className="space-y-4">
          <p className="text-lg">
            Based on your responses, you show characteristics primarily associated with:
            <span className="font-bold text-blue-600 ml-2">
              {results.primaryType.charAt(0).toUpperCase() + results.primaryType.slice(1)} OCD
            </span>
          </p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Detailed Scores:</h3>
            {results.scores.map(({ category, averageScore }) => (
              <div key={category} className="flex items-center mb-2">
                <div className="w-32 text-gray-600">
                  {category.charAt(0).toUpperCase() + category.slice(1)}:
                </div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded-full">
                    <div
                      className="h-4 bg-blue-500 rounded-full"
                      style={{ width: `${(averageScore / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-2 text-sm text-gray-600">
                  {averageScore.toFixed(1)}/5
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onComplete}
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">OCD Assessment</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg mb-4">{questions[currentQuestion].text}</h3>
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              disabled={loading}
              className={`p-4 border rounded-lg hover:bg-blue-50 transition-colors
                ${answers[questions[currentQuestion].id] === value ? 'bg-blue-100 border-blue-500' : 'border-gray-200'}
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              {value}
            </button>
          ))}
        </div>
        <div className="mt-2 text-sm text-gray-500 flex justify-between">
          <span>Never</span>
          <span>Always</span>
        </div>
      </div>
    </div>
  );
}

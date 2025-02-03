'use client';

import { User } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '@/lib/api/firebase';

interface Question {
  id: number;
  text: string;
  category: string;
}

const questions: Question[] = [
  { id: 1, text: 'Ich überprüfe Dinge öfter als nötig', category: 'checking' },
  { id: 2, text: 'Ich wasche meine Hände öfter als andere Menschen', category: 'contamination' },
  { id: 3, text: 'Ich muss Dinge in einer bestimmten Reihenfolge ordnen', category: 'symmetry' },
  { id: 4, text: 'Ich habe störende Gedanken, die ich nicht kontrollieren kann', category: 'intrusive' },
  { id: 5, text: 'Ich verbringe viel Zeit damit, Dinge zu reinigen', category: 'contamination' },
  { id: 6, text: 'Ich überprüfe Türen und Fenster mehrmals', category: 'checking' },
  { id: 7, text: 'Ich brauche Symmetrie in meiner Umgebung', category: 'symmetry' },
  { id: 8, text: 'Ich habe aggressive oder beängstigende Gedanken', category: 'intrusive' },
];

interface Props {
  user: User;
  onComplete?: () => void;
}

export default function OCDQuestions({ user, onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = async (value: number) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitting(true);
      const results = calculateResults(newAnswers);
      
      try {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.exists() ? userDoc.data() : {};
        
        await setDoc(userRef, {
          ...userData,
          ocdAssessment: {
            timestamp: Date.now(),
            answers: newAnswers,
            results
          }
        });

        onComplete?.();
      } catch (error) {
        console.error('Error saving assessment:', error);
      }
      
      setIsSubmitting(false);
    }
  };

  const calculateResults = (answers: { [key: number]: number }) => {
    const categories = ['checking', 'contamination', 'symmetry', 'intrusive'];
    const scores = categories.map(category => {
      const categoryQuestions = questions.filter(q => q.category === category);
      const sum = categoryQuestions.reduce((acc, q) => acc + (answers[q.id] || 0), 0);
      return {
        category,
        averageScore: sum / categoryQuestions.length
      };
    });

    const primaryType = scores.reduce((max, score) => 
      score.averageScore > max.averageScore ? score : max
    ).category;

    return {
      primaryType,
      scores
    };
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  if (isSubmitting) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Speichere Ergebnisse...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${getProgressPercentage()}%` }}
          ></div>
        </div>
        <div className="mt-2 text-sm text-gray-600 text-right">
          Frage {currentQuestion + 1} von {questions.length}
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          {questions[currentQuestion].text}
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          Bewerten Sie auf einer Skala von 1 bis 5, wie sehr diese Aussage auf Sie zutrifft.
        </p>
      </div>

      {/* Answer Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            onClick={() => handleAnswer(value)}
            className={`
              p-4 rounded-lg text-center transition-all duration-200
              ${
                answers[questions[currentQuestion].id] === value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }
            `}
          >
            <div className="text-lg md:text-xl font-semibold">{value}</div>
            <div className="text-xs md:text-sm mt-1">
              {value === 1 ? 'Trifft nicht zu' : value === 5 ? 'Trifft sehr zu' : ''}
            </div>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className={`
            px-4 py-2 rounded-lg transition-colors
            ${
              currentQuestion === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }
          `}
        >
          Zurück
        </button>
        <div className="text-sm text-gray-500">
          Sie können Ihre Antworten später noch ändern
        </div>
      </div>
    </div>
  );
}

"use client"
import { JSX, useEffect, useState } from "react";
import { Navbartop } from "./components/Bars";
import OCDQuestions from "@/components/assessment/OCDQuestions";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import fbapp, { db } from "@/lib/api/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function Home(): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAssessment, setShowAssessment] = useState(false);

  useEffect(() => {
    const auth = getAuth(fbapp);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserDetails(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAssessmentComplete = () => {
    setShowAssessment(false);
    // Refresh user details to show new assessment results
    if (user) {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      });
    }
  };

  const renderAssessmentStatus = () => {
    if (!userDetails?.ocdAssessment) {
      return (
        <div className="text-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">OCD Assessment</h2>
          <p className="text-gray-600 mb-6">
            Take our comprehensive OCD assessment to understand your symptoms better.
            This assessment will help identify potential OCD patterns and provide insights
            into your specific situation.
          </p>
          <button
            onClick={() => setShowAssessment(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Assessment
          </button>
        </div>
      );
    }

    const assessment = userDetails.ocdAssessment;
    const date = new Date(assessment.timestamp).toLocaleDateString();
    
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold">Your OCD Assessment Results</h2>
          <span className="text-sm text-gray-500">Taken on {date}</span>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Primary OCD Type:</h3>
          <p className="text-blue-600 font-bold text-xl">
            {assessment.results.primaryType.charAt(0).toUpperCase() + 
             assessment.results.primaryType.slice(1)} OCD
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Detailed Scores:</h3>
          {assessment.results.scores.map(({ category, averageScore }: any) => (
            <div key={category} className="flex items-center">
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
          onClick={() => setShowAssessment(true)}
          className="mt-6 text-blue-600 hover:text-blue-700 font-medium"
        >
          Take Assessment Again
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbartop />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <Navbartop />
      <div className="container mx-auto px-4 py-8">
        {user ? (
          showAssessment ? (
            <div className="max-w-3xl mx-auto">
              <OCDQuestions user={user} onComplete={handleAssessmentComplete} />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {renderAssessmentStatus()}
            </div>
          )
        ) : (
          <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Welcome to OCD Assessment</h2>
            <p className="text-gray-600 mb-6">
              Please sign in to take the OCD assessment and track your progress.
            </p>
            <Link
              href="/login"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

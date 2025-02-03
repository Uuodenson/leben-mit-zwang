'use client'

import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/api/firebase';
import { useRouter } from 'next/navigation';

interface ProfileData {
  bio?: string;
  location?: string;
  interests?: string[];
  ocdAssessment?: {
    timestamp: number;
    results: {
      primaryType: string;
      scores: Array<{ category: string; averageScore: number }>;
    };
  };
}

interface ProfileDetailsProps {
  user: User | null;
}

export default function ProfileDetails({ user }: ProfileDetailsProps) {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.uid) {
        setLoading(false);
        router.push('/login');
        return;
      }

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data() as ProfileData);
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError('Fehler beim Laden der Profildaten. Bitte versuchen Sie es später erneut.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user?.uid, router]);

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Über mich</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Bio</h3>
              <p className="mt-1 text-gray-900">{profileData?.bio || 'Keine Bio vorhanden'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Standort</h3>
              <p className="mt-1 text-gray-900">{profileData?.location || 'Nicht angegeben'}</p>
            </div>
            {profileData?.interests && profileData.interests.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">Interessen</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* OCD Assessment Results */}
        {profileData?.ocdAssessment && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">OCD Assessment</h2>
              <span className="text-sm text-gray-500">
                {new Date(profileData.ocdAssessment.timestamp).toLocaleDateString()}
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Primärer OCD-Typ</h3>
                <p className="mt-1 text-lg font-medium text-blue-600">
                  {profileData.ocdAssessment.results.primaryType.charAt(0).toUpperCase() +
                    profileData.ocdAssessment.results.primaryType.slice(1)}{' '}
                  OCD
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Detaillierte Bewertung</h3>
                <div className="space-y-3">
                  {profileData.ocdAssessment.results.scores.map(({ category, averageScore }) => (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </span>
                        <span className="text-gray-900 font-medium">{averageScore.toFixed(1)}/5</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${(averageScore / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

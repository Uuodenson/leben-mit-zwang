'use client';

import { User } from 'firebase/auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';

interface ProfileHeaderProps {
  user: User;
  onSignOut: () => void;
}

export default function ProfileHeader({ user, onSignOut }: ProfileHeaderProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="px-6 py-4 relative">
          <div className="absolute -top-16 left-6">
            {user.photoURL && !imageError ? (
              <Image
                src={user.photoURL}
                alt={user.displayName || 'Profile'}
                width={128}
                height={128}
                className="rounded-full border-4 border-white shadow-lg"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-500">
                  {(user.displayName || user.email || '?')[0].toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="ml-40">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.displayName || 'Anonymous User'}
            </h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex space-x-4">
              <button
                onClick={onSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
              >
                Sign Out
              </button>
              <button
                onClick={() => redirect('/profile/edit')}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

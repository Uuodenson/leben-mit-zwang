'use client';

import { User } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ProfileHeaderProps {
  user: User | null;
  onSignOut: () => void;
}

export default function ProfileHeader({ user, onSignOut }: ProfileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          {/* Profile Image and Name */}
          <div className="flex flex-col items-center md:flex-row md:space-x-4">
            <div className="relative w-24 h-24 md:w-20 md:h-20">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full object-cover border-4 border-white/20"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {user.email?.[0].toUpperCase() || 'U'}
                </div>
              )}
            </div>
            <div className="text-center md:text-left mt-2 md:mt-0">
              <h1 className="text-2xl font-bold">{user.displayName || 'User'}</h1>
              <p className="text-white/80 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2 w-full md:w-auto md:flex-row md:space-y-0 md:space-x-3">
            <button
              onClick={onSignOut}
              className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors w-full md:w-auto text-center"
            >
              Sign Out
            </button>
            <button
              onClick={() => router.push('/profile/edit')}
              className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors w-full md:w-auto text-center"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

interface ProfileDetailsProps {
  userDetails: {
    email?: string;
    displayName?: string;
    phoneNumber?: string;
    createdAt?: string;
    bio?: string;
    location?: string;
    interests?: string[];
    [key: string]: any;
  };
}

export default function ProfileDetails({ userDetails }: ProfileDetailsProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Email</label>
                <p className="text-gray-900">{userDetails.email || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Display Name</label>
                <p className="text-gray-900">{userDetails.displayName || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                <p className="text-gray-900">{userDetails.phoneNumber || 'Not provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Member Since</label>
                <p className="text-gray-900">{formatDate(userDetails.createdAt)}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Additional Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Bio</label>
                <p className="text-gray-900">{userDetails.bio || 'No bio provided'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Location</label>
                <p className="text-gray-900">{userDetails.location || 'Not specified'}</p>
              </div>
              {userDetails.interests && userDetails.interests.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-500">Interests</label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {userDetails.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

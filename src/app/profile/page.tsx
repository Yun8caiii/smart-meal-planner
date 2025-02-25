// app/profile/page.tsx
'use client';

import { useUser } from '@clerk/nextjs';

export default function Profile() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Profile</h1>
        <div>
          <p className="text-gray-700"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p className="text-gray-700"><strong>Email:</strong> {user.emailAddresses[0].emailAddress}</p>
          {/* Add more profile fields or update functionality as needed */}
        </div>
      </div>
    </div>
  );
}

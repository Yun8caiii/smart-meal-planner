// app/dashboard/page.tsx
'use client';

import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from '@clerk/nextjs';
import { useState, FormEvent } from 'react';

export default function Dashboard() {
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [availableIngredients, setAvailableIngredients] = useState('');
  const [favoriteCuisines, setFavoriteCuisines] = useState('');
  const [mealPlan, setMealPlan] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Convert comma-separated ingredients into an array
      const ingredientsArray = availableIngredients.split(',').map((item) => item.trim());

      const response = await fetch('/api/mealplan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dietaryPreferences,
          availableIngredients: ingredientsArray,
          favoriteCuisines,
        }),
      });
      const data = await response.json();
      setMealPlan(data.mealPlan);
    } catch (error) {
      console.error('Error generating meal plan:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gray-50 p-8">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-end">
              <UserButton />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              Smart Meal Planner
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">Dietary Preferences</label>
                <input
                  type="text"
                  value={dietaryPreferences}
                  onChange={(e) => setDietaryPreferences(e.target.value)}
                  placeholder="e.g. vegetarian, vegan, gluten-free"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-gray-700">Available Ingredients</label>
                <input
                  type="text"
                  value={availableIngredients}
                  onChange={(e) => setAvailableIngredients(e.target.value)}
                  placeholder="e.g. spinach, tomatoes, quinoa"
                  className="w-full mt-1 p-2 border rounded"
                />
                <p className="text-sm text-gray-500">Enter ingredients separated by commas</p>
              </div>
              <div>
                <label className="block text-gray-700">Favorite Cuisines</label>
                <input
                  type="text"
                  value={favoriteCuisines}
                  onChange={(e) => setFavoriteCuisines(e.target.value)}
                  placeholder="e.g. Mediterranean, Italian, Asian"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
              >
                {loading ? 'Generating...' : 'Generate Meal Plan'}
              </button>
            </form>
            {mealPlan && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                  Your Meal Plan & Grocery List
                </h2>
                <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded border border-gray-200">
                  {mealPlan}
                </pre>
              </div>
            )}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}

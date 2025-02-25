'use client'

import React from 'react'

import { useState } from 'react';

const Dashboard = () => {
    const [mealPlan, setMealPlan] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const generateMealPlan = async () => {
        setLoading(true);
        try{
            const response = await fetch('/api/mealplan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dietaryPreferences: 'Vegan',
                    availableIngredients: ['tofu', 'broccoli', 'quinoa'],
                    favoriteCuisines: 'Thai'
                })
            });

            const result = await response.json();
            setMealPlan(result.mealPlan);
        } catch(error){
            console.error('Error generating meal plan:', error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className='min-h-screen bg-gray-50 p-8'>
            <div className='max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6'>
                <h1 className='text-3xl font-bold text-gray-800 mb-4 text-center'>
                    Smart Meal Planner Dashboard
                </h1>
                <button
                    onClick={generateMealPlan}
                    disabled={loading}
                    className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200'
                >
                    {loading ? 'Generating...' : 'Generate Meal Plan'}
                </button>
                {mealPlan && (
                    <div className='mt-8'>
                        <h2 className='text-2xl font-bold text-gray-700 mb-2'>
                            Your Meal Plan & Grocery List
                        </h2>
                        <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded border border-gray-200">
                            {mealPlan}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dashboard
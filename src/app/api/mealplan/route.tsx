// app/api/mealplan/route.ts
import { NextResponse } from 'next/server';

interface MealPlanRequest {
  dietaryPreferences: string;
  availableIngredients: string[];
  favoriteCuisines: string;
}

export async function POST(request: Request) {
  try {
    // Log request received (for debugging purposes)
    console.log('Received meal plan request');

    const { dietaryPreferences, availableIngredients, favoriteCuisines }: MealPlanRequest = await request.json();

    // Build the prompt for the OpenAI API
    const prompt = `Generate a weekly meal plan with breakfast, lunch, and dinner for a user with the following details:
Dietary Preferences: ${dietaryPreferences}
Favorite Cuisines: ${favoriteCuisines}
Available Ingredients: ${availableIngredients.join(', ')}
Also, generate a grocery list for any additional ingredients needed.`;

    // Log the prompt for debugging
    console.log('Prompt sent to OpenAI:', prompt);

    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo-instruct',
        prompt,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch from OpenAI', details: errorData },
        { status: 500 }
      );
    }

    const data = await response.json();

    // Log the returned data for debugging
    console.log('OpenAI API response:', data);

    return NextResponse.json({ mealPlan: data.choices[0].text });
  } catch (error) {
    console.error('Error in POST /api/mealplan:', error);
    return NextResponse.json({ error: 'Failed to generate meal plan', details: error }, { status: 500 });
  }
}

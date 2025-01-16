import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {

    try {

        const { feedbacks } = await req.json();
      if (!Array.isArray(feedbacks) || feedbacks.length === 0) {
        return NextResponse.json({
          keyInsights: ['No feedback data available'],
          sentimentBreakdown: {},
          themes: [],
          recommendations: []
        });
      }
      const feedbackTexts = feedbacks
        .map((f, index) => `Feedback ${index + 1}: "${f.text}" (Rating: ${f.stars}/5)`)
        .join('\n');
      const prompt = `Analyze these customer feedbacks and provide a structured analysis:
  ${feedbackTexts}
  Provide the analysis in the following JSON format:
  {
    "keyInsights": ["insight1", "insight2", "insight3"],
    "sentimentBreakdown": {
      "positive": number,
      "neutral": number,
      "negative": number
    },
    "themes": [
      {"name": "theme name", "count": number}
    ],
    "recommendations": [
      {
        "priority": "high/medium/low",
        "action": "specific action to take",
        "reasoning": "why this action is recommended"
      }
    ]
  }
  Focus on identifying key patterns, sentiment distribution, common themes, and actionable recommendations. Base the analysis on both the feedback text and ratings.`;
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) {
        throw new Error('JSON not found in Gemini response');
      }
      const jsonText = text.substring(jsonStart, jsonEnd + 1);
      try {
        const analysis = JSON.parse(jsonText);
        return NextResponse.json(analysis);
      } catch (error) {
        console.error('Error parsing cleaned Gemini response:', error);
        return NextResponse.json({
          keyInsights: ['Error analyzing feedback'],
          sentimentBreakdown: {},
          themes: [],
          recommendations: []
        }, { status: 500 });
      }
    } catch (error) {
  
        console.error('Error in feedback analysis:', error);
      return NextResponse.json({
        keyInsights: ['Error analyzing feedback'],
        sentimentBreakdown: {},
        themes: [],
        recommendations: []
  
    }, { status: 500 });
    }
  }
  
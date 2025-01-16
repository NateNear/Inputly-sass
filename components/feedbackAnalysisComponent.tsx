"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Smile, Meh, Frown, Lightbulb, CheckCircle } from "lucide-react";

interface Theme {
  name: string;
  count: number;
}
interface Recommendation {
  priority: string;
  action: string;
  reasoning: string;
}
interface AIInsights {
  keyInsights: string[];
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    negative: number;
  };
  themes: Theme[];
  recommendations: Recommendation[];
}
interface FeedbackAnalysisClientProps {
  initialFeedbacks: Array<{
    feedback: string;
    stars: number;
  }>;
}

export default function FeedbackAnalysisClient({ initialFeedbacks }: FeedbackAnalysisClientProps) {
  const [insights, setInsights] = useState<AIInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const analyzeWithAI = async () => {
      try {
        const feedbackTexts = initialFeedbacks.map((f) => ({
          text: f.feedback,
          stars: f.stars,
        }));
        const response = await fetch("/api/analyze-feedback", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ feedbacks: feedbackTexts }),
        });
        if (!response.ok) {
          throw new Error("AI analysis failed");
        }
        const aiAnalysis = await response.json();
        setInsights(aiAnalysis);
        setError(null);
      } catch (error) {
        console.error("AI analysis error:", error);
        setError("Failed to analyze feedback");
      } finally {
        setLoading(false);
      }
    };
    if (initialFeedbacks.length > 0) {
      analyzeWithAI();
    } else {
      setLoading(false);
      setError("No feedback data available");
    }
  }, [initialFeedbacks]);

  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center animate-pulse text-indigo-600">Analyzing feedback...</div>
        </CardContent>
      </Card>
    );
  }

  if (error || !insights) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center text-red-500">{error || "Unable to analyze feedback"}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 right-0 w-[600px] h-[600px] bg-purple-100 dark:bg-purple-500 rounded-full blur-[128px] opacity-60 animate-pulse" />
        <div className="absolute -bottom-20 left-0 w-[1000px] h-[1000px] bg-indigo-100 dark:bg-green-500 rounded-full blur-[128px] opacity-60 animate-pulse" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <Card className="shadow-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">
              AI Feedback Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Key Insights */}
            <section>
              <h3 className="font-semibold text-xl mb-2">Key Insights</h3>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                {insights.keyInsights.map((insight, index) => (
                  <p key={index} className="mb-2 text-gray-700 dark:text-gray-300">{insight}</p>
                ))}
              </div>
            </section>

            {/* Sentiment Breakdown */}
            <section>
              <h3 className="font-semibold text-xl mb-2">Sentiment Distribution</h3>
              <div className="space-y-2">
                {Object.entries(insights.sentimentBreakdown).map(([sentiment, count]) => (
                  <div key={sentiment} className="flex items-center justify-between">
                    <span className="capitalize text-sm font-medium">{sentiment}</span>
                    <div className="w-2/3 bg-gray-200 rounded-lg h-3 overflow-hidden">
                      <div
                        className={`h-3 rounded-lg ${
                          sentiment === "positive"
                            ? "bg-green-500"
                            : sentiment === "neutral"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${(count / 100) * 100}%` }}
                      />
                    </div>
                    <span>{count} feedback(s)</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Common Themes */}
            <section>
              <h3 className="font-semibold text-xl mb-2">Common Themes</h3>
              <div className="grid gap-4">
                {insights.themes.map((theme, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <Lightbulb className="text-indigo-500 w-6 h-6 mr-4" />
                    <div>
                      <p className="font-medium">{theme.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {theme.count} mentions
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Actionable Recommendations */}
            <section>
              <h3 className="font-semibold text-xl mb-2">Actionable Recommendations</h3>
              <div className="space-y-4">
                {insights.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle
                        className={`w-6 h-6 ${
                          rec.priority === "high"
                            ? "text-red-500"
                            : rec.priority === "medium"
                            ? "text-yellow-500"
                            : "text-green-500"
                        }`}
                      />
                      <p className="font-semibold">{rec.action}</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{rec.reasoning}</p>
                  </div>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

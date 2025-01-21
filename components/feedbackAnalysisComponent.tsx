'use client'
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Lightbulb, TrendingUp, MessageCircle, Target, AlertCircle } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState('insights');

  useEffect(() => {
    const analyzeWithAI = async () => {
      try {
        const feedbackTexts = initialFeedbacks.map((f) => ({
          text: f.feedback,
          stars: f.stars,
        }));
        const response = await fetch("/api/analyze-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ feedbacks: feedbackTexts }),
        });
        if (!response.ok) throw new Error("AI analysis failed");
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
      <div className="min-h-[600px] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-t-indigo-500 border-r-indigo-500 border-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg text-gray-600">Analyzing your feedback data...</p>
          <p className="text-sm text-gray-400">This might take a moment</p>
        </div>
      </div>
    );
  }

  if (error || !insights) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
              <div className="text-xl font-semibold text-red-500">{error || "Unable to analyze feedback"}</div>
              <p className="text-gray-500">Please try again later or contact support if the issue persists.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'insights', label: 'Key Insights', icon: TrendingUp },
    { id: 'sentiment', label: 'Sentiment', icon: MessageCircle },
    { id: 'themes', label: 'Themes', icon: Lightbulb },
    { id: 'recommendations', label: 'Recommendations', icon: Target },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'insights':
        return (
          <div className="grid gap-6">
            {insights.keyInsights.map((insight, index) => (
              <Card key={index} className="transform transition-all hover:scale-102 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{insight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'sentiment':
        return (
          <div className="space-y-8">
            {Object.entries(insights.sentimentBreakdown).map(([sentiment, count]) => (
              <div key={sentiment} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="capitalize font-medium text-gray-700">{sentiment}</span>
                  <span className="text-sm text-gray-500">{count}%</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      sentiment === "positive"
                        ? "bg-gradient-to-r from-green-400 to-green-500"
                        : sentiment === "neutral"
                        ? "bg-gradient-to-r from-yellow-400 to-yellow-500"
                        : "bg-gradient-to-r from-red-400 to-red-500"
                    }`}
                    style={{ width: `${count}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case 'themes':
        return (
          <div className="grid gap-4 md:grid-cols-2">
            {insights.themes.map((theme, index) => (
              <Card key={index} className="transform transition-all hover:scale-102 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                      <Lightbulb className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{theme.name}</h4>
                      <p className="text-sm text-gray-500">{theme.count} mentions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'recommendations':
        return (
          <div className="space-y-6">
            {insights.recommendations.map((rec, index) => (
              <Card key={index} className="transform transition-all hover:scale-102 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        rec.priority === "high"
                          ? "bg-red-100 text-red-700"
                          : rec.priority === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}>
                        {rec.priority.toUpperCase()}
                      </div>
                      <h4 className="font-semibold text-gray-800">{rec.action}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{rec.reasoning}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto">
        <Card className="shadow-xl border-0">
          <CardHeader className="border-b bg-white/50 backdrop-blur-sm">
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Feedback Analysis
            </CardTitle>
            <div className="flex justify-center mt-6">
              <div className="inline-flex rounded-lg border p-1 bg-gray-50">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                        activeTab === tab.id
                          ? "bg-white shadow-sm text-indigo-600"
                          : "text-gray-600 hover:text-indigo-600"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {renderTabContent()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
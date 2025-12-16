import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const getAIStudyPlan = async (weakTopics: string[]): Promise<string> => {
  if (!apiKey) return "API Key missing. Please configure environment variables.";
  
  try {
    const prompt = `Create a 3-day micro study plan for a student weak in: ${weakTopics.join(', ')}. Keep it concise, motivational, and bulleted.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Could not generate plan.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI service temporarily unavailable.";
  }
};

export const getDetailedExplanation = async (question: string, answer: string): Promise<string> => {
  if (!apiKey) return "Explanation unavailable (API Key missing).";

  try {
    const prompt = `Explain why '${answer}' is the correct answer to the question: '${question}'. Keep it simple for a high school student. Max 2 sentences.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Explanation not found.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not fetch AI explanation.";
  }
};

export const generateDashboardInsights = async (userPerformance: any): Promise<string> => {
  if (!apiKey) {
    return "Based on your recent scores, you're excelling in Algebra but struggling with Organic Chemistry. Let's focus on Reaction Mechanisms today!";
  }
  
  try {
     const prompt = `Analyze this student data: ${JSON.stringify(userPerformance)}. Give a 1-sentence motivating insight and a topic to focus on.`;
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
     });
     return response.text || "Keep up the great work! Try a new quiz today.";
  } catch (error) {
      return "Based on your recent scores, you're excelling in Algebra but struggling with Organic Chemistry. Let's focus on Reaction Mechanisms today!";
  }
};

export const generateCVSummary = async (jobTitle: string, skills: string): Promise<string> => {
    if (!apiKey) return "Passionate professional looking for new opportunities. (AI unavailable)";

    try {
        const prompt = `Write a professional, concise CV summary (max 50 words) for a ${jobTitle} with skills in ${skills}. Use an active voice and professional tone.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text || "Experienced professional seeking to leverage skills in a new role.";
    } catch (error) {
        return "Experienced professional seeking to leverage skills in a new role.";
    }
};

export const enhanceCVDescription = async (text: string): Promise<string> => {
    if (!apiKey) return text;
    try {
        const prompt = `Rewrite the following job description bullet point to be more professional, action-oriented, and impactful for a CV: "${text}". Keep it one sentence.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        return response.text || text;
    } catch (error) {
        return text;
    }
};
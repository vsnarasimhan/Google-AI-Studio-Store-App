
import { GoogleGenAI, Type } from "@google/genai";
import { FoodItem, Order, AIInsight } from "../types";

export const getGeminiInsights = async (
  inventory: FoodItem[],
  orders: Order[]
): Promise<AIInsight> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Act as a business consultant for "Fast Chennai", a South Indian fast-food shop.
    Analyze the following data and provide business insights.
    
    Inventory: ${JSON.stringify(inventory.map(i => ({ name: i.name, stock: i.stock })))}
    Recent Orders: ${JSON.stringify(orders.map(o => ({ total: o.totalAmount, date: o.date })))}
    
    Provide a professional summary, 3 actionable suggestions for growth, and a list of trending items based on stock/order dynamics.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            suggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            trendingItems: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "suggestions", "trendingItems"]
        }
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("AI Insight Error:", error);
    return {
      summary: "AI Insights are currently unavailable. Check your sales dashboard for raw data.",
      suggestions: ["Run a weekend promotion", "Review low-stock items", "Optimize delivery routes"],
      trendingItems: ["Ghee Podi Dosa", "Filter Coffee"]
    };
  }
};

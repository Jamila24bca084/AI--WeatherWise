const { GoogleGenAI } = require("@google/genai");

async function generateWeatherInsight(weather) {
  // Resilient fallback when Gemini is not configured.
  if (!process.env.GEMINI_API_KEY) {
    return {
      mode: "fallback",
      summary: `The current weather in ${weather.city} is ${weather.description} with a temperature of ${weather.temperature}°C.`,
      recommendation: "Carry suitable clothing for the current conditions and check the forecast before outdoor activities.",
      activity: "Choose an activity appropriate for the current weather.",
      clothing: "Wear comfortable clothing suitable for the temperature and conditions."
    };
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
  });

  const prompt = `
You are WeatherWise, an intelligent weather assistant.

Analyze this live weather data:
City: ${weather.city}
Country: ${weather.country}
Temperature: ${weather.temperature}°C
Feels like: ${weather.feelsLike}°C
Humidity: ${weather.humidity}%
Condition: ${weather.condition}
Description: ${weather.description}
Wind speed: ${weather.windSpeed} m/s
Visibility: ${weather.visibility} meters

Return a concise JSON object with exactly these fields:
{
  "summary": "natural language weather summary",
  "recommendation": "practical recommendation",
  "activity": "suggested activity",
  "clothing": "clothing suggestion"
}

Do not use markdown.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text || "";
    const cleaned = text.replace(/```json|```/g, "").trim();

    return {
      mode: "gemini",
      ...JSON.parse(cleaned)
    };
  } catch (error) {
    console.error("Gemini request failed:", error.message);

    return {
      mode: "fallback",
      summary: `The current weather in ${weather.city} is ${weather.description} with a temperature of ${weather.temperature}°C.`,
      recommendation: "Check local conditions before planning outdoor activities.",
      activity: "Choose an activity suitable for the current weather.",
      clothing: "Wear clothing appropriate for the current temperature."
    };
  }
}

module.exports = { generateWeatherInsight };

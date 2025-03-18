import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
let genAI = null;

export const diseaseDetectionService = {
  loadModel: async () => {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      console.log("API Key status:", apiKey ? "Present" : "Missing");

      if (!apiKey || apiKey === "your_api_key_here") {
        throw new Error(
          "API key is missing or invalid. Set VITE_GEMINI_API_KEY in your .env file."
        );
      }

      genAI = new GoogleGenerativeAI(apiKey);
      console.log("Gemini AI initialized successfully");
      return true;
    } catch (error) {
      console.error("Error loading Gemini model:", error);
      throw error;
    }
  },

  analyzeImage: async (imageElement) => {
    try {
      if (!genAI) {
        console.error("genAI is not initialized");
        throw new Error("Model not initialized. Call loadModel() first.");
      }

      // Convert imageElement (HTMLImageElement) to a base64 string
      const canvas = document.createElement("canvas");
      canvas.width = imageElement.width;
      canvas.height = imageElement.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(imageElement, 0, 0);
      const base64Image = canvas.toDataURL("image/jpeg").split(",")[1]; // Remove the data URI prefix

      // Get the generative model
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash", // Updated to use the correct model name
      });

      // Prepare the prompt
      const prompt = `Analyze this crop image and provide detailed information about:
      1. The main disease or condition detected (if any)
      2. Confidence level of the detection
      3. Description of the disease/condition
      4. Recommended treatments
      5. Other possible conditions that might be present
      
      Return ONLY a JSON object with NO additional text or markdown formatting using this structure:
      {
        "mainPrediction": {
          "disease": "Disease name",
          "probability": 0.95,
          "description": "Description of the disease",
          "treatments": ["treatment1", "treatment2"]
        },
        "secondaryPredictions": [
          {
            "disease": "Alternative condition",
            "probability": 0.05
          }
        ]
      }`;

      // Generate content using multimodal input (text + image)
      const result = await model.generateContent([
        { text: prompt },
        { inlineData: { mimeType: "image/jpeg", data: base64Image } },
      ]);

      const response = await result.response;
      const text = await response.text();

      // Clean up the response text by removing markdown formatting
      const cleanJson = text.replace(/```json\n|\n```|```/g, "").trim();

      // Parse the JSON response
      const analysis = JSON.parse(cleanJson);

      return analysis;
    } catch (error) {
      console.error("Error analyzing image:", error);
      throw error;
    }
  },
};

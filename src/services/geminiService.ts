import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface MedicationInfo {
  genericName: string;
  commercialNames: string[];
  mechanismOfAction: string;
  dosageAndAdministration: string;
  indications: string;
  contraindications: string;
  pregnancyAndLactation: string;
  adverseEffects: string;
  interactions: string;
}

export async function getMedicationDetails(drugName: string): Promise<MedicationInfo> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Proporciona información detallada para el vademécum médico sobre el medicamento: ${drugName}. 
    Responde estrictamente en formato JSON con la siguiente estructura:
    {
      "genericName": "Nombre genérico",
      "commercialNames": ["Nombre comercial 1", "Nombre comercial 2"],
      "mechanismOfAction": "Explicación detallada del mecanismo",
      "dosageAndAdministration": "Dosis y modo de administración",
      "indications": "Indicaciones clínicas",
      "contraindications": "Contraindicaciones generales",
      "pregnancyAndLactation": "Uso en embarazo y lactancia",
      "adverseEffects": "Efectos adversos comunes y graves",
      "interactions": "Interacciones medicamentosas relevantes"
    }
    Usa español médico profesional.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          genericName: { type: Type.STRING },
          commercialNames: { type: Type.ARRAY, items: { type: Type.STRING } },
          mechanismOfAction: { type: Type.STRING },
          dosageAndAdministration: { type: Type.STRING },
          indications: { type: Type.STRING },
          contraindications: { type: Type.STRING },
          pregnancyAndLactation: { type: Type.STRING },
          adverseEffects: { type: Type.STRING },
          interactions: { type: Type.STRING },
        },
        required: [
          "genericName",
          "commercialNames",
          "mechanismOfAction",
          "dosageAndAdministration",
          "indications",
          "contraindications",
          "pregnancyAndLactation",
          "adverseEffects",
          "interactions"
        ],
      },
    },
  });

  let jsonStr = response.text || "{}";
  // Strip markdown code blocks if present
  if (jsonStr.includes("```json")) {
    jsonStr = jsonStr.split("```json")[1].split("```")[0];
  } else if (jsonStr.includes("```")) {
    jsonStr = jsonStr.split("```")[1].split("```")[0];
  }
  
  return JSON.parse(jsonStr.trim());
}

import { GoogleGenerativeAI as genAI} from "@google/generative-ai";
const apiKey="AIzaSyDVhYUo7YODiACdG76_ZwLnlo2MwutzY9A"

export const geminiCode = async(prompt:string)=>{
    const gen = new genAI(apiKey);
    const model = gen.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt)
    const text = result.response.text()
    return text
}
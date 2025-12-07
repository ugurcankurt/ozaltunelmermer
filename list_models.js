const { GoogleGenerativeAI } = require("@google/generative-ai");

async function listModels() {
    const genAI = new GoogleGenerativeAI("AIzaSyDDRKaz2lFvkfLSjJWcjCCZFC06JtdY8k8");
    try {
        const modelResponse = await genAI.getModel("gemini-1.5-flash");
        console.log("gemini-1.5-flash found:", modelResponse);
    } catch (error) {
        // console.log("Specific check failed, listing all...");
    }

    /* 
       Note: The Node SDK doesn't have a direct listModels() method exposed easily on the main class 
       in some versions, but we can try to infer or use the REST API if needed.
       However, let's try a standard model that SHOULD exist. 
       If 1.5-flash-002 failed, maybe just 'gemini-1.5-flash' works but I missed something?
       Actually the listModels endpoint is on the GoogleGenerativeAI instance? No, it's usually on a Manager.
       
       Let's try to just fetch "models/gemini-1.5-flash" directly or just print widely used ones.
    */

    // Let's rely on the strategy of checking what works. 
    // But a script to list models would be better using the direct fetch if SDK doesn't expose it easily.
}

// Better approach: minimal script to hit the REST endpoint directly to see available models
const apiKey = "AIzaSyDDRKaz2lFvkfLSjJWcjCCZFC06JtdY8k8";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log("Available Models:");
        if (data.models) {
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log(JSON.stringify(data, null, 2));
        }
    })
    .catch(err => console.error(err));

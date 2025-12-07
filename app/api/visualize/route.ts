import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return NextResponse.json(
                { error: "Gemini API key yapılandırılmamış" },
                { status: 500 }
            );
        }

        const { imageBase64, stoneName, stoneImageBase64 } = await request.json();

        if (!imageBase64 || !stoneName) {
            return NextResponse.json(
                { error: "Görsel ve taş adı gerekli" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        // Nano Banana Pro Preview - Image generation model
        const model = genAI.getGenerativeModel({
            model: "nano-banana-pro-preview",
            generationConfig: {
                temperature: 0.2, // Reduce creativity to prevent hallucinations/mirroring
                topP: 0.8,
                topK: 40
            }
        });

        // Create the prompt for countertop visualization
        const prompt = `You are an expert interior design AI.
        Task: Replace the countertop in the SECOND image (kitchen) with the stone texture shown in the FIRST image.
        
        Instructions:
        1. Identify the countertop area in the KITCHEN image (Input 2).
        2. Apply the texture, pattern, and color from the STONE SAMPLE (Input 1) to the countertop surface.
        3. The new countertop MUST look exactly like the provided stone sample image.
        4. Maintain the exact same kitchen layout, lighting, reflections, and perspective.
        5. CRITICAL: Do NOT mirror, flip, or rotate the kitchen image. Keep the geometry EXACTLY as the original.
        6. Do NOT change anything else in the kitchen (cabinets, walls, floor must stay the same).
        
        Input 1: Stone texture sample ("${stoneName}")
        Input 2: Kitchen photo
        Output: Photorealistic image of the kitchen with the new stone countertop.`;

        // Prepare image parts - ORDER MATTERS!
        // We put Stone Image FIRST, and Kitchen Image SECOND (LAST).
        // Models often use the last image as the primary canvas/resolution reference.
        const imageParts: any[] = [];

        // 1. Add stone image (Reference)
        if (stoneImageBase64) {
            imageParts.push({
                inlineData: {
                    data: stoneImageBase64.replace(/^data:image\/\w+;base64,/, ""),
                    mimeType: "image/jpeg",
                },
            });
        } else {
            console.error("Warning: Stone image is missing!");
        }

        // 2. Add kitchen image (Target)
        imageParts.push({
            inlineData: {
                data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
                mimeType: "image/jpeg",
            },
        });

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;

        console.log("Gemini Raw Response:", JSON.stringify(response, null, 2));

        let text = "";
        try {
            text = response.text();
        } catch (e) {
            console.log("No text in response, checking for other parts");
        }

        // Check for images in response
        let generatedImage = null;

        if (response.candidates && response.candidates[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    if (part.inlineData.mimeType.startsWith("image/")) {
                        generatedImage = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                        break;
                    }
                }
            }
        }

        return NextResponse.json({
            description: text,
            generatedImage: generatedImage
        });

    } catch (error) {
        console.error("Gemini API error:", error);
        return NextResponse.json(
            { error: "AI işlemi sırasında hata oluştu" },
            { status: 500 }
        );
    }
}

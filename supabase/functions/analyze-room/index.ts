import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify authentication
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.log('No authorization header provided');
      return new Response(
        JSON.stringify({ error: 'Authorization required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client and verify the user
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.log('Authentication failed:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Authenticated user:', user.id);

    const { image } = await req.json();
    const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
    
    if (!OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      throw new Error('OpenAI API key is not configured');
    }

    if (!image) {
      throw new Error('No image provided');
    }

    // Validate image input (basic validation)
    if (typeof image !== 'string' || image.length > 10 * 1024 * 1024) {
      throw new Error('Invalid image format or size too large');
    }

    console.log('Calling OpenAI API for room analysis...');

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are an expert interior designer AI. Analyze the room image and provide detailed design suggestions. Return ONLY a valid JSON object (no markdown, no code blocks) with the following structure:
{
  "roomType": "string (e.g., Living Room, Bedroom, Kitchen)",
  "dimensions": "string (estimated dimensions)",
  "currentStyle": "string (current design style)",
  "suggestions": [
    {
      "title": "string",
      "description": "string (specific actionable suggestion)",
      "category": "furniture" | "lighting" | "color" | "decor",
      "estimatedCost": "string (in INR range)"
    }
  ],
  "moodBoard": ["array of 3 design style keywords"],
  "overallScore": number (1-100, current design quality score)
}
Provide 4-5 specific, actionable suggestions with realistic Indian market prices.`
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Analyze this room and provide interior design suggestions with estimated costs in Indian Rupees."
              },
              {
                type: "image_url",
                image_url: {
                  url: image
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402 || response.status === 401) {
        return new Response(
          JSON.stringify({ error: 'API authentication failed. Please check your API key.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    console.log('OpenAI response received');

    // Parse the JSON from the AI response
    let analysisResult;
    try {
      // Try to extract JSON from the response (handle markdown code blocks)
      let jsonString = content;
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || content.match(/```\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonString = jsonMatch[1];
      } else {
        const plainJsonMatch = content.match(/\{[\s\S]*\}/);
        if (plainJsonMatch) {
          jsonString = plainJsonMatch[0];
        }
      }
      analysisResult = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Parse error:', parseError, 'Content:', content);
      // Return a fallback result
      analysisResult = {
        roomType: "Room",
        dimensions: "Standard size",
        currentStyle: "Contemporary",
        suggestions: [
          {
            title: "Enhance Lighting",
            description: "Add layered lighting with a mix of ambient, task, and accent lights.",
            category: "lighting",
            estimatedCost: "₹15,000 - ₹40,000"
          },
          {
            title: "Add Accent Colors",
            description: "Introduce warm accent colors through cushions, throws, or artwork.",
            category: "color",
            estimatedCost: "₹8,000 - ₹20,000"
          },
          {
            title: "Upgrade Furniture",
            description: "Consider adding comfortable seating or modern furniture pieces.",
            category: "furniture",
            estimatedCost: "₹25,000 - ₹75,000"
          }
        ],
        moodBoard: ["Modern", "Warm", "Inviting"],
        overallScore: 70
      };
    }

    console.log('Analysis complete for user:', user.id);

    return new Response(
      JSON.stringify(analysisResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('analyze-room error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

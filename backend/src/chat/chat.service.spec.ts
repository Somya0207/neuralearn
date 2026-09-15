import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async askTutor(message: string, lectureContext: string) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: `You are a friendly, encouraging CS tutor helping a student understand: ${lectureContext}. Keep answers short (2-4 sentences), clear, and step-by-step when explaining concepts.`,
          },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();
    console.log('GROQ RESPONSE:', JSON.stringify(data));
    return data.choices[0].message.content;
  }
}
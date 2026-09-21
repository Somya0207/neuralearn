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
        model: 'openai/gpt-oss-120b',
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
    return data.choices[0].message.content;
  }

  async askAboutDocument(message: string, documentContent: string) {
    const truncated = documentContent.slice(0, 12000);

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: `You are a tutor helping a student understand a specific document. Answer ONLY using the document content below. If the answer isn't in the document, say so clearly.\n\nDOCUMENT:\n${truncated}`,
          },
          { role: 'user', content: message },
        ],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
  async generateNotes(lectureTitle: string, lectureTopic: string) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        messages: [
          {
            role: 'system',
            content: 'You are a CS tutor writing concise study notes. Use short bullet points, bold key terms, keep it under 150 words.',
          },
          {
            role: 'user',
            content: `Write study notes for a lecture titled "${lectureTitle}" on the topic of ${lectureTopic}.`,
          },
        ],
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  }
}
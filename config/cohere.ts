import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: 'sng76JbSxSYYe6Pc9uU8dUOtyoTi4tPdPV0IAN4u',
});

/**
 * Sends a message to Cohere's chat model and returns the response content.
 * @param message - The user's input.
 * @returns The assistant's response.
 */
export async function getCohereResponse(message: string): Promise<string> {
  try {
    const response = await cohere.chat({
      model: 'command-r-plus',
      messages: [
        {
          role: 'system',
          content: `You are a specialized knowledge assistant that provides precise, factual responses based on the provided context. 

IMPORTANT GUIDELINES:
- Provide ONLY direct, specific answers
- Use exact information from the context
- Keep responses concise and to the point
- If information is not in the context, say "I don't have enough information"
- Do not add explanations, introductions, or conclusions
- Focus on the most relevant information only`
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.1, // Lower temperature for more deterministic responses
      maxTokens: 500, // Shorter responses for more specificity
      p: 0.9, // Nucleus sampling for focused responses
      k: 50, // Top-k sampling for more relevant tokens
    });

    console.log('Cohere request message:', message);
    console.log('Cohere response:', response);

    const content = Array.isArray(response.message?.content)
      ? response.message.content.map((c) => c.text).join('')
      : response.message?.content ?? 'No response from Cohere.';

    return content;
  } catch (error) {
    console.error('Cohere API error:', error);
    return 'I apologize, but I encountered an error while processing your request. Please try again.';
  }
}

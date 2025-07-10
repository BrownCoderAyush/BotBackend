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
  const response = await cohere.chat({
    model: 'command-a-03-2025',
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  });

  console.log(message, "msg")

  const content = Array.isArray(response.message?.content)
    ? response.message.content.map((c) => c.text).join('')
    : response.message?.content ?? 'No response from Cohere.';

  return content;
}

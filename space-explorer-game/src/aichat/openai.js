const sendToOpenAI = async (userMessage) => {
    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Replace with your OpenAI API key
        },
        body: JSON.stringify({
          prompt: `insert prompt ${userMessage}`,
          max_tokens: 100,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch response from OpenAI API');
      }
  
      const result = await response.json();
      return result.choices[0].text;
    } catch (error) {
      console.error('Error sending message to OpenAI API:', error);
      throw error; // Propagate the error to the calling function/component
    }
  };
  
  export default sendToOpenAI;
  
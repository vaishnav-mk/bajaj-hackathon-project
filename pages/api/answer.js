const NGROK_URL = process.env.NGROK_URL;
export default async function handler(req, res) {
  const timestamp = Date.now();
  let { question, text } = req.body;
  text = text.replaceAll(/<[^>]*>?/gm, '');
  let result = await fetch(
    `${NGROK_URL}/answer`,
    {
      method: "POST",
      body: JSON.stringify({
        question,
        text: text.replaceAll(/<[^>]*>?/gm, ''),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  result = await result.json();
  res
    .status(200)
    .json({ result, timeTaken: Math.round((Date.now() - timestamp) / 1000) });
}

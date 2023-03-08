import { Configuration, OpenAIApi } from 'openai';

const api_key = process.env.OPEN_AI_SECRET_KEY;
const model_engine = 'text-davinci-002';

const configuration = new Configuration({
    apiKey: api_key,
});
const openai = new OpenAIApi(configuration);

async function summarize(text: string, num_paragraphs: number) {
  const prompt = `Please summarize the following text in ${num_paragraphs} paragraphs and wrap each paragraph in html p element:\n${text}`;

  const completions = await openai.createCompletion({
    model: model_engine,
    prompt: prompt,
    n: 1,
    max_tokens: 1000,
  });

  const summary = completions.data.choices[0]?.text?.trim();

  if (!summary) {
    throw  new Error();
  }

  const category = await categorise(summary);

  return {summary, category};
}

async function categorise(text: string) {
  const prompt = `What is the category of the following text (example: AUTOMATION, PROGRAMMING):\n${text}`;

  const completions = await openai.createCompletion({
    model: model_engine,
    prompt: prompt,
    n: 1,
    max_tokens: 15
  });

  const category = completions.data.choices[0]?.text?.trim();

  return category;
}



export { summarize};
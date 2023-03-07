import { Configuration, OpenAIApi } from 'openai';

const api_key = process.env.OPEN_AI_SECRET_KEY;
const model_engine = 'text-davinci-003';

const configuration = new Configuration({
    apiKey: api_key,
});
const openai = new OpenAIApi(configuration);

async function summarize(text: string, num_paragraphs: number) {
  const prompt = `Please summarize the following text in ${num_paragraphs} paragraphs:\n${text}`;

  const completions = await openai.createCompletion({
    model: model_engine,
    prompt: prompt,
    n: 1,
    max_tokens: 1000,
  });

  const summary = completions.data.choices[0]?.text?.trim();

  const category = await classify(summary as string);

  return {summary, category};
}

async function classify(text: string) {
  const prompt = `Please classify the following text:\n${text}`;

  const completions = await openai.createCompletion({
    model: model_engine,
    prompt: prompt,
    n: 1,
    max_tokens: 30
  });

  const category = completions.data.choices[0]?.text?.trim();

  return category;
}

export { summarize};
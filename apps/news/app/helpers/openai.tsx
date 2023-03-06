import { Configuration, OpenAIApi } from 'openai';

const api_key = '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';
const model_engine = 'text-davinci-003';

const configuration = new Configuration({
    apiKey: api_key,
});
const openai = new OpenAIApi(configuration);

async function summarize(text: string, num_sentences: number) {
  const prompt = `Please summarize the following text in ${num_sentences} sentences:\n${text}`;

  const completions = await openai.createCompletion({
    model: model_engine,
    prompt: prompt,
    n: 1,
    max_tokens: num_sentences*30,
  });

  return await completions.data;
}

export { summarize };
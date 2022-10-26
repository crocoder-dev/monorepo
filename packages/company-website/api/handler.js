export default function handler(request, response) {
  // api/[name].ts -> /api/lee
  // req.query.name -> "lee"
  console.log(request);
  const { name } = request.query;
  return response.end(`Hello ${name}!`);
}

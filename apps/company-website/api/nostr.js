import Cors from 'cors';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

function runMiddleware(
  req,
  res,
  fn,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const names = {
  davidabram: 'npub1t3jv90jwkltk9r7w32g29r3twu36vwk3yd05cqwvwrjthtlktwgsta5w7t',
  testing: 'npub1vjtdpt7jujk8em0s3d80njs00dw6kmrn4a99r68t5tn9qmeg0u9q37k5rr'
};

const nip05 = async (req, res) => {
  await runMiddleware(req, res, cors)
  const { name } = req.query;
  res.json({ [name]: names[name] });
}


export default nip05;
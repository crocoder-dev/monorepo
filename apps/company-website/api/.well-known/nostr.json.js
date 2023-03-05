
const names = {
  davidabram: 'npub1t3jv90jwkltk9r7w32g29r3twu36vwk3yd05cqwvwrjthtlktwgsta5w7t',
  testing: 'npub1vjtdpt7jujk8em0s3d80njs00dw6kmrn4a99r68t5tn9qmeg0u9q37k5rr'
};

const nip05 = (req, res) => {
  const { name } = req.query;
  res.json({ [name]: names[name] });
}


export default nip05;
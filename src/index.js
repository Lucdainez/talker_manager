const express = require('express');

const bodyParser = require('body-parser');

const {
  getAllTalkers,
  getTalkerId,
  generateRandomToken,
  addTalker,
  putTalker,
  deleteTalker,
} = require('./talker');

const {
  verificationEmail,
  verificationEmailRegex,
  verificationPassword,
  verificationPasswordLength,
} = require('./middlewares/verificationEmailAndPassword');

const tokenVerification = require('./middlewares/tokenVerification');

const { nameFieldVerification,
  lengthNameVerification,
  ageFieldVerification,
  minorVerification,
  talkFieldVerification,
  watchedAtFieldVerification,
  watchedAtDataVerification,
  rateFieldVerification,
  rateLengthVerification,
} = require('./middlewares/verificationRegisterTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use(express.json());

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (talkers) {
    return res.status(200).json(talkers);
  }
  return res.status(404).json([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerId = await getTalkerId(Number(id));
  if (!talkerId) {
    return res.status(404)
      .json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerId);
});

app.post('/login',
  verificationEmail,
  verificationEmailRegex,
  verificationPassword,
  verificationPasswordLength,
  (_req, res) => {
  const token = generateRandomToken();
  return res.status(200).json({ token });
});

app.use(tokenVerification);

app.post('/talker',
nameFieldVerification,
lengthNameVerification,
ageFieldVerification,
minorVerification,
talkFieldVerification,
watchedAtFieldVerification,
watchedAtDataVerification,
rateFieldVerification,
rateLengthVerification,
  async (req, res) => {
  const newTalker = req.body;
  const lastTalker = await addTalker(newTalker);
  return res.status(201).json(lastTalker);
});

app.put('/talker/:id',
nameFieldVerification,
lengthNameVerification,
ageFieldVerification,
minorVerification,
talkFieldVerification,
watchedAtFieldVerification,
watchedAtDataVerification,
rateFieldVerification,
rateLengthVerification,
async (req, res) => {
  const { id } = req.params;
  const alteredTalker = req.body;
  const talkerReturn = await putTalker(Number(id), alteredTalker);
  return res.status(200).json(talkerReturn);
});

app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  await deleteTalker(Number(id));
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});

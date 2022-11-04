const express = require('express');
const bodyParser = require('body-parser');
const { getAllTalkers, getTalkerId } = require('./talker');

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

app.listen(PORT, () => {
  console.log('Online');
});

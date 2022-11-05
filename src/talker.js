const fs = require('fs').promises;
const path = require('path');

const readTalkerFile = async () => {
    const contentFile = await fs.readFile(path.resolve(__dirname, '.', 'talker.json'), 'utf-8');
    return JSON.parse(contentFile);
};

const getAllTalkers = async () => {
  const talkers = await readTalkerFile();
  return talkers;
};

const getTalkerId = async (id) => {
  const talkers = await readTalkerFile();
  return talkers.find((talker) => talker.id === id);
};

const generateRandomToken = () => {
  let token = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
      token += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return token;
};

const addTalker = async (newTalker) => {
  let id = 5;
  const oldTalkers = await readTalkerFile();
  const newTalkerWithId = { id, ...newTalker };
  const allTalkers = JSON.stringify([...oldTalkers, newTalkerWithId]);
  await fs.writeFile(path.resolve(__dirname, '.', 'talker.json'), allTalkers);
  id += 1;
  return newTalkerWithId;
};

module.exports = {
  getAllTalkers,
  getTalkerId,
  generateRandomToken,
  addTalker,
};

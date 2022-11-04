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

module.exports = {
  getAllTalkers,
};
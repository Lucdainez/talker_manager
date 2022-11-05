const nameFieldVerification = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400)
      .json({ message: 'O campo "name" é obrigatório' });
  }
  return next();
};

const lengthNameVerification = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 3) {
    return res.status(400)
      .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const ageFieldVerification = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(400)
      .json({ message: 'O campo "age" é obrigatório' });
  }
  return next();
};

const minorVerification = (req, res, next) => {
  const { age } = req.body;
  if (age < 18) {
    return res.status(400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
};

const talkFieldVerification = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400)
      .json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
};

const watchedAtFieldVerification = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  return next();
};

const watchedAtDataVerification = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const regexData = watchedAt.match(/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/);
  if (!regexData) {
    return res.status(400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const rateFieldVerification = (req, res, next) => {
  const { talk } = req.body;
  if (!Object.keys(talk).some((a) => a === 'rate')) {
    return res.status(400)
      .json({ message: 'O campo "rate" é obrigatório' });
  }
  return next();
};

const rateLengthVerification = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate <= 0 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = {
  nameFieldVerification,
  lengthNameVerification,
  ageFieldVerification,
  minorVerification,
  talkFieldVerification,
  watchedAtFieldVerification,
  watchedAtDataVerification,
  rateFieldVerification,
  rateLengthVerification,
};
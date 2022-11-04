const verificationEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400)
      .json({ message: 'O campo "email" é obrigatório' });
  }
  return next();
};

const verificationEmailRegex = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
  if (!email.match(regexEmail)) {
    return res.status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

const verificationPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  return next();
};

const verificationPasswordLength = (req, res, next) => {
  const { password } = req.body;
  const passwordLength = 6;
  if (password.length < passwordLength) {
    return res.status(400)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
};

module.exports = {
  verificationEmail,
  verificationEmailRegex,
  verificationPassword,
  verificationPasswordLength,
};

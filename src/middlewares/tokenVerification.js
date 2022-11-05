module.exports = function tokenVerification(req, res, next) {
  const token = req.header('authorization');
  if (typeof (token) === 'string' && token.length === 16) {
    return next();
  }
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  return res.status(401).json({ message: 'Token inválido' });
};
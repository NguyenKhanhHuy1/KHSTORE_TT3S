const jwt = require('jsonwebtoken')

export function authenticateToken(req, res, next) {
  const token = req.headers['authorization']
  if (!token) return res.sendStatus(401) // Unauthorized

  const jwtToken = token.split(' ')[1];

  jwt.verify(jwtToken, 'secret_key', (err, user) => {
    if (err) return res.sendStatus(403) // Forbidden
    req.user = user // Gắn thông tin người dùng vào request
    next()
  })
}


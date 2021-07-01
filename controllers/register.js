const jwt = require('jsonwebtoken');

// Redis Setup
const redis = require('redis');

// You will want to update your host to the proper address in production
const redisClient = redis.createClient(process.env.REDIS_URI);

const registerToken = (username) => {
  const jwtPayload = { username };
  return jwt.sign(jwtPayload, 'JWT_SECRET_KEY', { expiresIn: '2 days'});
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = (user) => {
  const { email, id } = user;
  const token = registerToken(email);
  return setToken(token, id)
    .then(() => {
      return token
    })
    .catch(console.log);
};

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password) {
    return Promise.reject('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
   db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then(async (user) => {
            const token = await createSession(user[0])
            res.json({ user: user[0], token: token })
          })
          .then(trx.commit)
      })
      .catch(trx.rollback)
    })
    .catch(err => err)
}

module.exports = {
  handleRegister: handleRegister,
};
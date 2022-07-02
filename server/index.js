require('dotenv/config');
const path = require('path');
const pg = require('pg');
const express = require('express');
const jwt = require('jsonwebtoken');
const errorMiddleware = require('./error-middleware.js');
const ClientError = require('./client-error.js');

const http = require('http');
const { Server: IO } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new IO(server);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
}

app.use(express.static(publicPath));
app.use(express.json());

const meetings = io.of('/meetings');
meetings.on('connection', socket => {
  if (!socket.handshake.query.meetingId) {
    socket.disconnect();
    return;
  }

  const { meetingId } = socket.handshake.query;

  socket.join(meetingId);

});

app.get('/api/meetings/:meetingId', (req, res, next) => {
  const { meetingId } = req.params;

  const sql = `
  select "name", "description", "dates", "startTime", "endTime", "selectedBlocks"
  from "meetings"
  where "meetingId" = $1
  `;

  const params = [meetingId];
  db.query(sql, params)
    .then(result => {
      const [meeting] = result.rows;
      res.status(201).json(meeting);

    })
    .catch(err => next(err));
});

app.post('/api/meetings', (req, res, next) => {
  if (!req.body) {
    throw new ClientError(401, 'invalid meeting details');
  }
  const { name, description, daysSelected: dates, startTime, endTime, selectedBlocks } = req.body;

  const sql = `
  insert into "meetings" ("name", "description", "dates", "startTime", "endTime", "selectedBlocks")
  values ($1, $2, $3, $4, $5, $6)
  returning *
  `;

  const params = [name, description, dates, startTime, endTime, selectedBlocks];
  db.query(sql, params)
    .then(result => {
      const [meetingDetails] = result.rows;
      res.status(201).json(meetingDetails);
    })
    .catch(err => next(err));
});

app.post('/api/users', (req, res, next) => {

  const { username, meetingId, blocks } = req.body;
  const params1 = [username, meetingId];

  const checkSQL = `
  select *
    from "users"
    where "userName" = $1
    and "meetingId" = $2
  `;

  db.query(checkSQL, params1)
    .then(result => {

      if (result.rows[0]) {
        throw new ClientError(409, 'username is already taken');
      }

      const sql = `
      insert into "users" ("userName", "meetingId", "selectedTimes")
        values ($1, $2, $3)
      returning *
      `;

      const params2 = [username, meetingId, blocks];
      db.query(sql, params2)
        .then(result => {
          const [user] = result.rows;
          const { userId, userName } = user;
          const payload = { userId, userName };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);

          res.status(201).json({ token, user });
        })
        .catch(err => next(err));

    })
    .catch(err => next(err));

});

app.post('/api/users/:userId', (req, res, next) => {
  const { userId } = req.params;
  const { meetingId, blocks, group } = req.body;

  const sql = `
  update "users"
    set "selectedTimes" = $1
  where "userId" = $2
  and "meetingId" = $3
  returning *
  `;
  const params = [blocks, userId, meetingId];

  db.query(sql, params)
    .then(result => {

      const sql2 = `
      update "meetings"
        set "selectedBlocks" = $1
      where "meetingId" = $2
      returning *
      `;
      const params2 = [group, meetingId];
      db.query(sql2, params2)
        .then(result => {
          const [meetingDetails] = result.rows;

          res.status(201).json(meetingDetails);

          meetings.to(meetingId).emit('update', meetingDetails);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));

});

app.get('/api/users/:userId/meetingId/:meetingId', (req, res, next) => {
  const { userId, meetingId } = req.params;

  const sql = `
  select "selectedTimes"
  from "users"
  where "userId" = $1
  and "meetingId" = $2
  `;
  const params = [userId, meetingId];
  db.query(sql, params)
    .then(result => {
      if (!result) {
        throw new ClientError(401, 'user not found');
      }

      const [selectedTimes] = result.rows;

      res.status(200).json(selectedTimes);
    })
    .catch(err => next(err));
});

app.get('api/users/:username/meetingId/:meetingId', (req, res, next) => {
  const { username, meetingId } = req.params;
  console.log(username);
  console.log(meetingId);

  const sql = `
  select *
  from "users"
  where "userName" = $1
  and "meetingId" = $2
  `;

  const params = [username, meetingId];
  db.query(sql, params)
    .then(result => {
      if (!result) {
        throw new ClientError(401, 'user not found');
      }

      let [user] = result.rows;
      const { userId, userName } = user;
      const payload = { userId, userName };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET);

      res.status(200).json({ user, token });
    })
    .catch(err => next(err));
})

app.use(errorMiddleware);

server.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

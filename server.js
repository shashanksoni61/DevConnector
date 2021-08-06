const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// connecting to the database
connectDB();

// body parsing middleware
app.use(express.json({ extended: false }));

//checking if it handles CORS error or not
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE,PUT,'
  );

  next();
});

// defining routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/post'));

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//set port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));

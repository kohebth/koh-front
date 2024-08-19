const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

async function getToken() {
  try {
    const response = await axios.get('http://your-api-endpoint/token');
    return response.data.token;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
}

app.get('/login', async (req, res) => {
  const token = await getToken();
  res.render('login', { token });
});

app.post('/login', (req, res) => {
  const { email, password, token } = req.body;
  // Handle login logic here
  res.redirect('/confirmation');
});

app.get('/register', async (req, res) => {
  const token = await getToken();
  res.render('register', { token });
});

app.post('/register', (req, res) => {
  const { email, password, token } = req.body;
  // Handle registration logic here
  res.redirect('/confirmation');
});

app.get('/confirmation', async (req, res) => {
  const token = await getToken();
  res.render('confirmation', { token });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
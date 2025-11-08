require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dns = require('dns');

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const urlDatabase = {};
let idCounter = 1;

app.post('/api/shorturl', function (req, res) {
  const originalURL = req.body.url;

  try {
    const hostname = new URL(originalURL).hostname;

    dns.lookup(hostname, (err) => {
      if (err) return res.json({ error: "Invalid URL" });

      let existingId = Object.keys(urlDatabase).find(key => urlDatabase[key] === originalURL);
      if (existingId) {
        return res.json({ original_url: originalURL, short_url: Number(existingId) });
      }

      const shortId = idCounter++;
      urlDatabase[shortId] = originalURL;

      res.json({
        original_url: originalURL,
        short_url: shortId
      });
    });
  } catch (e) {
    res.json({ error: "invalid url" });
  }
});

app.get('/api/shorturl/:id', (req, res) => {
  const id = req.params.id;
  const originalURL = urlDatabase[id];

  if (originalURL) {
    return res.redirect(originalURL);
  } else {
    return res.json({ error: "No short URL found for given input" });
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

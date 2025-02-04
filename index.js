const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  exec('./fetch_vegetables.sh', (error, stdout, stderr) => {
    if (error) {
      console.error('Error executing script:', error);
      return res.status(500).send('Error fetching data');
    }

    if (stderr) {
      console.error('Script error:', stderr);
      return res.status(500).send('Error fetching data');
    }

    try {
      const data = JSON.parse(stdout);
      res.json(data);
    } catch (err) {
      console.error('Error parsing data:', err);
      res.status(500).send('Error parsing data');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

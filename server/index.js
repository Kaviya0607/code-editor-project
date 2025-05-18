const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const { v4: uuid } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/run', (req, res) => {
  const { language, code, input } = req.body;

  if (language !== 'python') {
    return res.status(400).json({ error: 'Only Python is supported for now' });
  }

  const filename = `temp-${uuid()}.py`;
  fs.writeFileSync(filename, code);

  const command = `python ${filename}`;

  const child = exec(command, (error, stdout, stderr) => {
    fs.unlinkSync(filename); // cleanup
    if (error) return res.json({ output: stderr });
    return res.json({ output: stdout });
  });

  if (input) {
    child.stdin.write(input + '\n');
    child.stdin.end();
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});

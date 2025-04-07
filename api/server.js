const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/api/guardar-resultados', (req, res) => {
  const { name, group, score, timeTaken } = req.body;

  const result = { name, group, score, timeTaken };
  
  fs.readFile('results.json', 'utf8', (err, data) => {
    let results = [];
    if (!err && data) {
      results = JSON.parse(data);
    }
    
    results.push(result);

    fs.writeFile('results.json', JSON.stringify(results, null, 2), (err) => {
      if (err) return res.status(500).send('Error al guardar los resultados');
      res.status(200).send('Resultado guardado correctamente');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

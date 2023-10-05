const express = require('express');
const items = require('./items');

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static('dist'));

app.get('/api/items', (req, res) => {
    const responseArray = [];

    if (req.query.search.length < 1) {
        const responseArray = items;
        return res.send({ responseArray })
    }

    items.forEach(element => {

        if (element.name.toLowerCase().includes(req.query.search.toLowerCase())) {
            responseArray.push(element)
        }
    });
    return res.send({ responseArray })
});

app.listen(port, () => console.log(`Listening on port ${port}!`));

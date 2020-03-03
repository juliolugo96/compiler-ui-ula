const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const SOURCE_FILES = {
    cplusplus: "fileSource.cpp",
    python: "fileSource.py",
    node: "fileSource.js",
    ula: "fileSource.ula"
}

const COMMANDS = {
    cplusplus: `g++ ${SOURCE_FILES.cplusplus} && ./a.out`,
    python: `python ${SOURCE_FILES.python}`,
    node: `node ${SOURCE_FILES.node}`,
    ula: `ula ${SOURCE_FILES.ula}`
}

async function runFile({ lang }) {
    try {
        const command = COMMANDS[lang];
        var { stdout } = await exec(command);
        return stdout;
    } catch ({ stderr }) {
        return stderr;
    }
}

function saveFile({ lang, codes }) {
    return new Promise((resolve, reject) => {
        fs.writeFile(SOURCE_FILES[lang], codes, function (err) {
            if (err) reject(err)
            else resolve()
        });
    });
}

app.post('/', async function (req, res) {
    await saveFile(req.body);
    const result = await runFile(req.body);
    res.send({ result });
});

app.listen(3000, function () {
    // eslint-disable-next-line no-console
    console.log('listening on port 3000!');
});

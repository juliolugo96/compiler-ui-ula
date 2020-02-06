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

const SOURCE_FILE_NAME = "fileSource.py";

async function runFile() {
    try {
        const command = `python ${SOURCE_FILE_NAME}`
        var { stdout } = await exec(command);
        return stdout;
    } catch ({ stderr }) {
        return stderr;
    }
}

function saveFile(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${SOURCE_FILE_NAME}`, data, function (err) {
            if (err) reject(err)
            else resolve()
        });
    });
}

app.post('/', async function (req, res) {
    await saveFile(req.body.codes);
    const result = await runFile();
    res.send({ result });
});

app.listen(3000, function () {
    // eslint-disable-next-line no-console
    console.log('listening on port 3000!');
});

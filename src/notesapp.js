const fs = require('fs');
const chalk = require('chalk');
const notesapp = require('./notesapp.js')
    // const validator = require('validator');
const {
    JSON
} = require('stream/consumers');
const {
    title
} = require('process');

const fileName = 'notes.json';
const filePath = './dataFiles/notes.json';
const backupPath = './dataFiles/backup.txt';



const fileManipulation = (data) => {
    console.log(chalk.bgBlackBright.white('--> Insert data start '));
    checkFile();
    let _filedata = readFile();


    _filedata[`Note - ${Object.keys(_filedata).length}`] = `${data}`;
    _filedata = JSON.stringify(_filedata);
    writeData(_filedata);
    console.log(chalk.bgGreen.black(' --> Insert data Complete'));
};
const fileData = (author, title, body) => {
    console.log(chalk.bgRed.black(' --> Creating data for file'));
    let data = {
        title: title,
        author: author,
        body: body
    }
    data = JSON.stringify(data);
    fileManipulation(data);
};


const checkFile = () => {
    if (fs.existsSync(filePath)) {
        console.log(chalk.bgGray.black(' ---> File is present <---'));
    } else {
        console.log(chalk.bgGray.black(' ---> File is not present <---'));
        createFile();
    }
};
const createFile = () => {
    console.log(chalk.bgGray.black(' ---> Created a JSON File <---'));
    fs.writeFileSync(filePath, '{}');
};

const writeFile = (notes) => {
    console.log(chalk.bgGray.black(' ---> Writing data in to File <---'));
    fs.appendFileSync(filePath, notes);
    fs.appendFileSync(filePath, ',\n');

};
const readFile = () => {
    console.log(chalk.bgWhite.black("---> Read data from note. <---"));
    let fileData = fs.readFileSync(filePath, {
        encoding: "utf8"
    });
    fileData = JSON.parse(fileData);
    return fileData;


}
const writeData = (data) => {
    console.log(chalk.bgCyan.black('--> writeing data into file <--'));
    fs.writeFileSync(filePath, data);
};

const exportNotes = () => {
    console.log(chalk.bgBlue.white('-->Exporting notes<--'));
    let_exportData = JSON.stringify(readFile());
    fs.writeFileSync(path, _exportData);
};


const removeNote = (_title) => {
    let _filedata = readFile();
    let removeflage = true;
    for (let _data in _filedata) {
        let tempdata = JSON.parse(_filedata[_data]);
        if (tempdata.title == _title) {
            removeflage = false;

            let _backup = {};
            _backup[`${_data}`] = _filedata[_data];
            backup(JSON.stringify(_backup));

            console.log(chalk.bgRed.black(`Deleting title : ${_title} data from file`));
            let date = new Date();
            let deletedata = {
                title: 'remove',
                description: `Removed on --->$(date)`
            }
            _filedata[_data] = JSON.stringify(deletedata);



        }
    }
    if (removeflage) {
        console.log(chalk.bgGreen.black(`(-------No data found with title :${_title})-------------`));
        console.log(chalk.bgGreen.black(`(---------- Please run list command to check note -----------------)`));

    } else {
        _filedata = JSON.stringify(_filedata);
        fs.writeFileSync(filePath, _filedata);
    }
}
const backup = (_backup) => {
    if (!fs.existsSync(backupPath)) {
        fs.writeFileSync(backupPath, '')
    }
    fs.appendFileSync(backupPath, _backup);
    fs.appendFileSync(backupPath, ',\n');
    console.log(chalk.green('---> Creating backup for delet data'));
}
const notesList = () => {
    let _notes = readFile();
    for (let note in _notes) {
        let temp = JSON.parse(_notes[note]);
        if (temp.title != 'remove') {
            console.log(chalk.bgBlack.white(`   -- ${temp.title} `));
        }
    }
}

const readNote = (data) => {
    let _notes = readFile();
    for (let note in _notes) {
        let temp = JSON.parse(_notes[note]);
        if (temp.title == data) {
            console.log(chalk.bgCyan.black(`     - {  Description  } -`));
            console.log(chalk.bgYellow.black(`${temp.body}`));
        }

    }
};


module.exports = {
    filedata: fileData,
    removenote: removeNote,
    notelist: notesList,
    readnote: readNote
};
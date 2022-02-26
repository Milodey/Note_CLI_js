const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
// const validator = require('validator');
const notesapp = require('./src/notesapp');


yargs.version('17.0.1');


yargs.command({
    command: 'add',
    describe: 'Add note',
    builder: {
        title: {
            describe: 'Add note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Add a body',
            demandOption: true,

        }
    },
    handler: (argv) => {
        console.log(chalk.bgGreen.black("----------  Adding a new note  ----------"));
        let author = 'Nirmallya dey';
        notesapp.filedata(author, argv.title, argv.body);
        console.log(chalk.bgGreen.black("----------  A new note created  ----------"));
    }
});

yargs.command({
    command: 'remove',
    describe: 'Remove note',
    builder: {
        title: {
            describe: 'Remove note Title',
            demandOption: true,
            type: 'string'
        }

    },
    handler: (argv) => {
        console.log(chalk.bgRed.black("------------ Remove a new note------------"));
        notesapp.removenote(argv.title);
        console.log(chalk.bgRed.black("--------- Note Removed ---------"));
    }
});

yargs.command({
    command: 'list',
    describe: 'List notes',

    handler: (argv) => {
        console.log(chalk.bgYellow.black("------------ List notes. ------------"));
        notesapp.notelist();
        console.log(chalk.bgYellow.black("--------- List notes. ---------"));
    }
});
yargs.command({
    command: 'read',
    describe: 'Read from note',
    builder: {
        title: {
            describe: 'Add note Title',
            demandOption: true,
            type: 'string'
        },

    },

    handler: (argv) => {
        console.log(chalk.bgWhite.black("------------ Read from note. ------------"));
        notesapp.readnote(argv.title);
        console.log(chalk.bgWhite.black("--------- End of the note. ---------"));
    }
});
yargs.parse();
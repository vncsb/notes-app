const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return 'Your notes...';
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log('New note added!');
  } else {
    console.log('Note title taken!');
  }
};

const removeNote = (title) => {
  const notes = loadNotes();

  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note: "' + title + '" removed!'));
    saveNotes(notesToKeep);
  } else {
    console.log(chalk.red.inverse('Note does not exist!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.yellow.inverse('Your notes:'));

  notes.forEach((note) => console.log(chalk.green.inverse(note.title)));
};

const readNote = (title) => {
  const note = loadNotes().find((note) => note.title === title);

  if (note) {
    console.log(chalk.blue.bold.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBufffer = fs.readFileSync('notes.json');
    const dataJson = dataBufffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};

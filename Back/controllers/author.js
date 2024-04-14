const authorService = require('../services/author');
const { matchedData } = require("express-validator");


async function list(req, res) {
  try {
    const authors = await authorService.getList(matchedData(req))
    res.json(authors);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Unable to fetch books' });
  }
}


async function get(req, res) {
  try {
    const author = await authorService.getItem(matchedData(req))
    res.json(author);
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ error: 'Unable to fetch author' });
  }
}


async function create(req, res) {
  try {
    await authorService.createItem(matchedData(req))
    res.status(201).json({ message: 'Author created successfully' });
  } catch (error) {
    console.error('Error create author:', error);
    res.status(500).json({ error: 'Unable to create author' });
  }
}


async function update(req, res) {
  try {
    await authorService.updateItem(matchedData(req))
    res.json({ message: 'Author updated successfully' });
  } catch (error) {
    console.error('Error updating author:', error);
    res.status(500).json({ error: 'Unable to update author' });
  }
}


async function del(req, res) {
  try {
    await authorService.deleteItem(matchedData(req))
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ error: 'Unable to delete author' });
  }
}


async function autoComplete(req, res) {
  try {
    const suggestions = await authorService.autocomplete(matchedData(req))
    res.json(suggestions);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    res.status(500).json({ error: 'Unable to fetch suggestions' });
  }
}


module.exports = {
  list,
  get,
  create,
  update,
  del,
  autoComplete
}

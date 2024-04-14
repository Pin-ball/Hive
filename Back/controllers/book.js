const bookService = require('../services/book');
const { matchedData } = require('express-validator');

async function list(req, res) {
  try {
    const books = await bookService.getList(matchedData(req))
    if (books.length === 0) {
      res.status(204)
    }
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Unable to fetch books' });
  }
}


async function get(req, res) {
  try {
    const book = await bookService.getItem(matchedData(req))
    if (book === undefined || book === null) {
      res.status(204)
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Unable to fetch book' });
  }
}


async function create(req, res) {
  try {
    await bookService.createItem(matchedData(req))
    res.status(201).json({ message: 'Book created successfully' });
  } catch (error) {
    console.error('Error create book:', error);
    res.status(500).json({ error: 'Unable to create book' });
  }
}


async function update(req, res) {
  try {
    await bookService.updateItem(matchedData(req))
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Unable to update book' });
  }
}


async function del(req, res) {
  try {
    await bookService.deleteItem(matchedData(req))
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Unable to delete book' });
  }
}


async function autoComplete(req, res) {
  try {
    const suggestions = await bookService.autocomplete(matchedData(req))
    if (suggestions.length === 0) {
      res.status(204)
    }
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

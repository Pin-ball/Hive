const borrowService = require('../services/borrow');
const { matchedData } = require('express-validator');

async function list(req, res) {
  try {
    const borrows = await borrowService.getList(matchedData(req))
    if (borrows.length === 0) {
      res.status(204)
    }
    res.json(borrows);
  } catch (error) {
    console.error('Error fetching borrows:', error);
    res.status(500).json({ error: 'Unable to fetch borrows' });
  }
}

async function create(req, res) {
  try {
    await borrowService.create(matchedData(req))
    res.status(201).json({ message: 'Borrow created successfully' });
  } catch (error) {
    console.error('Error create borrow:', error);
    res.status(500).json({ error: 'Unable to borrow book' });
  }
}

async function update(req, res) {
  try {
    await borrowService.update(matchedData(req))
    res.json({ message: 'Borrow updated successfully' });
  } catch (error) {
    console.error('Error updating borrow:', error);
    res.status(500).json({ error: 'Unable to update borrow' });
  }
}

module.exports = {
  list,
  create,
  update
}

const db = require('../database');
const config = require('../config');
const utils = require("../utils");

async function getList(params) {
  const { ids, authorIds, borrow, available, page } = params

  const query = db
    .from('book')
    .select('book.*')
    .leftJoin('author', 'book.authorId', 'author.id')
    .select({authorName: 'author.name'})


  if(ids) {
    query.whereIn('book.id', ids.split(','))
  }
  if(authorIds) {
    query.whereIn('authorId', authorIds.split(','))
  }

  if(borrow && !available) {
    query.whereNotNull('borrowId')
  }
  if(!borrow && available) {
    query.whereNull('borrowId')
  }

  if (page) {
    query.offset((page-1) * config.itemPerPage).limit(config.itemPerPage)
  }

  return query;
}

async function getItem ({id}) {
  const books = await db('book')
    .where('book.id', id)
    .leftJoin('author', 'book.authorId', 'author.id')
    .leftJoin('borrow', 'book.id', 'borrow.bookId')
    .select('book.*')
    .select({borrowCustomerEmail: 'borrow.customerEmail', borrowStart: 'borrow.startDate', borrowEnd: 'borrow.endDate'})
    .select({authorId: 'author.id', authorName: 'author.name', authorBiography: 'author.biography', authorCountry: 'author.country'})
    .orderBy('borrow.startDate', 'desc')

  if (!books.length)
    return null

  let book = {
    id: books[0].id,
    ISBN: books[0].ISBN,
    title: books[0].title,
    genre: books[0].genre,
    pages: books[0].pages,
    editor: books[0].editor,
    resume: books[0].resume,
    language: books[0].language,
    borrowId: books[0].borrowId,
    publicationDate: books[0].publicationDate,
    author: null,
    borrows: []
  }

  if (books[0].authorName !== null) {
    book.author = {
      id: books[0].authorId,
      name: books[0].authorName,
      country: books[0].authorCountry,
      biography: books[0].authorBiography,
    }
  }

  books.map(b => {
    if (b.borrowCustomerEmail == null)
      return;

    book.borrows.push({
      customerEmail: b.borrowCustomerEmail,
      start: b.borrowStart,
      end: b.borrowEnd,
    })
  })

  return book
}

async function createItem (params) {
  return db('book').insert(params);
}

async function updateItem ({id, ...params}) {
  const body = {
    ...params,
    modificationDate: utils.getDate()
  }
  return db('book').where({ id }).update(body);
}

async function deleteItem ({id}) {
  await db('book').where({ id }).del();
}

async function autocomplete ({q}) {
  return db('book').select(['id', 'title']).where('title', 'like', `%${q}%`);
}

module.exports = {
  getList,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  autocomplete
};
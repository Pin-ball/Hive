/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API de gestion les livres
 * /book/list:
 *   get:
 *     summary: Liste de livres
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: ids
 *         schema:
 *           type: string
 *         required: false
 *         description: Ids de livre (ids séparés par ",")
 *       - in: query
 *         name: authorIds
 *         schema:
 *           type: string
 *         required: false
 *         description: Ids de livre (ids séparés par ",")
 *       - in: query
 *         name: borrow
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Emprunté
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Disponible
 *     responses:
 *       200:
 *         description: Liste de livres
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Requête incorrect
 *       500:
 *         description: Erreur serveur
 */
 /**
  @swagger
 * /book/{id}:
 *   get:
 *     summary: Obtenir un livre
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id du livre
 *     responses:
 *       200:
 *         description: Livre crée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Requête incorrect
 *       500:
 *         description: Erreur serveur
 */
 /**
  @swagger
 * /book:
 *   post:
 *     summary: Créer un livre
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Livre crée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Requête incorrect
 *       500:
 *         description: Erreur serveur
 */
 /**
 * @swagger
 * /book/{id}:
 *   put:
 *     summary: Modifier un livre
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id du livre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Livre modifié
 *       400:
 *         description: Requête incorrect
 *       500:
 *         description: Erreur serveur
 */
/**
 @swagger
 * /book/{id}:
 *   delete:
 *     summary: Supprimer un livre
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Id du livre
 *     responses:
 *       200:
 *         description: Livre supprimer
 *       400:
 *         description: Requête incorrect
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - authorId
 *         - editor
 *         - publicationDate
 *         - ISBN
 *         - genre
 *         - resume
 *         - pages
 *         - language
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: Titre
 *         authorId:
 *           type: int
 *           description: ID Auteur
 *         editor:
 *           type: string
 *           description: Editeur
 *         publicationDate:
 *           type: string
 *           format: date
 *           description: Date de publication
 *         ISBN:
 *           type: string
 *           description: ISBN (10 ou 13)
 *         genre:
 *           type: string
 *           description: Genre littéraire
 *         resume:
 *           type: string
 *           description: Résumé
 *         pages:
 *           type: integer
 *           description: Nombre de pages
 *         language:
 *           type: string
 *           description: Langue
 *         borrowId:
 *           type: integer
 *           description: ID Emprunt
 *         creationDate:
 *           type: string
 *           format: date
 *           description: Date d'ajout du livre
 *         modificationDate:
 *           type: string
 *           format: date
 *           description: Date de modification du livre
 *       example:
 *         id: 1
 *         title: "Harry Potter 1 - Ecole des sorciers"
 *         author: "J.K Rowling"
 *         editor: "Gallimard"
 *         publicationDate: 2020-03-10
 *         ISBN: "054506967X"
 *         genre: "Soft Fantasie"
 *         resume: "Lorem ipsum dolor sit amet."
 *         pages: 285
 *         language: "Français"
 *         borrowId: null
 *         creationDate: 2020-03-10
 *         modificationDate: 2020-03-10
 */
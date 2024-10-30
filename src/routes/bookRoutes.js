const express = require('express');
const router = express.Router();
const booksController = require('../controllers/bookController');

router.get('/all', booksController.getAllBooks);
router.get('/:id', booksController.getBook);
router.post('/create', booksController.createBook);
router.put('/update/:id', booksController.updateBook);
router.delete('/delete/:id', booksController.deleteBook);
router.get('/search', booksController.searchBooks);


module.exports = router;

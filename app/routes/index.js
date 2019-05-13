import { Router } from 'express';
import BooksController from '../components/books/BooksController';
import PostsController from '../components/posts/PostsController';

const router = Router();

router.get('/books', BooksController.getAllBooks);
router.post('/books', BooksController.addBook);
router.get('/books/:id', BooksController.getABook);
router.put('/books/:id', BooksController.updatedBook);
router.delete('/books/:id', BooksController.deleteBook);

router.get('/posts', PostsController.getAllPosts);
router.post('/posts', PostsController.addPost);
router.get('/posts/:id', PostsController.getAPost);
router.put('/posts/:id', PostsController.updatedPost);
router.delete('/posts/:id', PostsController.deletePost);

export default router;

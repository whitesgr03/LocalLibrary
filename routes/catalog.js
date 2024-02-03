const express = require("express");
const router = express.Router();

const book_controller = require("../controllers/bookController");
const author_controller = require("../controllers/authorController");
const genre_controller = require("../controllers/genreController");
const book_instance_controller = require("../controllers/bookinstanceController");

router.get("/", book_controller.index);
router.get("/book/:id", book_controller.book_detail);
router.get("/books", book_controller.book_list);
router
	.route("/book/create")
	.get(book_controller.book_create_get)
	.post(book_controller.book_create_post);

router
	.route("/book/:id/delete")
	.get(book_controller.book_delete_get)
	.post(book_controller.book_delete_post);

router
	.route("/book/:id/update")
	.get(book_controller.book_update_get)
	.post(book_controller.book_update_post);

router.get("/author/:id", author_controller.author_detail);
router.get("/authors", author_controller.author_list);
router
	.route("/author/create")
	.get(author_controller.author_create_get)
	.post(author_controller.author_create_post);

router
	.route("/author/:id/delete")
	.get(author_controller.author_delete_get)
	.post(author_controller.author_delete_post);

router
	.route("/author/:id/update")
	.get(author_controller.author_update_get)
	.post(author_controller.author_update_post);

router.get("/genre/:id", genre_controller.genre_detail);
router.get("/genres", genre_controller.genre_list);
router
	.route("/genre/create")
	.get(genre_controller.genre_create_get)
	.post(genre_controller.genre_create_post);

router
	.route("/genre/:id/delete")
	.get(genre_controller.genre_delete_get)
	.post(genre_controller.genre_delete_post);

router
	.route("/genre/:id/update")
	.get(genre_controller.genre_update_get)
	.post(genre_controller.genre_update_post);

router.get("/bookinstance/:id", book_instance_controller.bookinstance_detail);
router.get("/bookinstances", book_instance_controller.bookinstance_list);
router
	.route("/bookinstance/create")
	.get(book_instance_controller.bookinstance_create_get)
	.post(book_instance_controller.bookinstance_create_post);

router
	.route("/bookinstance/:id/delete")
	.get(book_instance_controller.bookinstance_delete_get)
	.post(book_instance_controller.bookinstance_delete_post);

router
	.route("/bookinstance/:id/update")
	.get(book_instance_controller.bookinstance_update_get)
	.post(book_instance_controller.bookinstance_update_post);

module.exports = router;

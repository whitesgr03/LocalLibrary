const asyncHandler = require("express-async-handler");

const Genre = require("../models/genre");
const Book = require("../models/book");

const genre_list = asyncHandler(async (req, res, next) => {
	const allGenres = await Genre.find().sort({ name: 1 }).exec();

	res.render("genre_list", {
		title: "Genre List",
		genre_list: allGenres,
	});
});
const genre_detail = asyncHandler(async (req, res, next) => {
	const [genre, booksInGenre] = await Promise.all([
		Genre.findById(req.params.id).exec(),
		Book.find({ genre: req.params.id }, ["title", "summary"])
		.exec(),
	]);

	const genreNotFound = () => {
		const err = new Error("Genre not found");
		err.status = 404;
		return next(err);
	};

	genre === null
		? genreNotFound()
		: res.render("genre_detail", {
				title: "Genre Detail",
				genre,
				genre_books: booksInGenre,
		  });
});
const genre_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre create GET");
});
const genre_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre create POST");
});
const genre_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre delete GET");
});
const genre_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre delete POST");
});
const genre_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre update GET");
});
const genre_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Genre update POST");
});

module.exports = {
	genre_list,
	genre_detail,
	genre_create_get,
	genre_create_post,
	genre_delete_get,
	genre_delete_post,
	genre_update_get,
	genre_update_post,
};

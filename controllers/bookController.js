const asyncHandler = require("express-async-handler");

const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const index = asyncHandler(async (req, res, next) => {
	const numBooks = Book.countDocuments().exec();
	const numBookInstances = BookInstance.countDocuments().exec();
	const nunAvailableBookInstances = BookInstance.countDocuments({
		status: "Available",
	}).exec();
	const numAuthors = Author.countDocuments().exec();
	const numGenres = Genre.countDocuments().exec();

	res.render("index", {
		title: "Local Library Home",
		book_count: await numBooks,
		book_instance_count: await numBookInstances,
		book_instance_available_count: await nunAvailableBookInstances,
		author_count: await numAuthors,
		genre_count: await numGenres,
	});
});
const book_list = asyncHandler(async (req, res, next) => {
	const allBooks = await Book.find({}, ["title", "author"])
		.sort({
			title: 1,
		})
		.populate("author")
		.exec();
	res.render("book_list", { title: "Book List", book_list: allBooks });
});
const book_detail = asyncHandler(async (req, res, next) => {
	const [book, bookInstances] = await Promise.all([
		Book.findById(req.params.id)
			.populate("author")
			.populate("genre")
			.exec(),
		BookInstance.find({ book: req.params.id }).exec(),
	]);

	const bookNotFound = () => {
		const err = new Error("Book not found");
		err.status = 404;
		return next(err);
	};

	book === null
		? bookNotFound()
		: res.render("book_detail", {
				book,
				book_instances: bookInstances,
		  });
});
const book_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book create GET");
});
const book_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book create POST");
});
const book_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book delete GET");
});
const book_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book delete POST");
});
const book_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book update GET");
});
const book_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book update POST");
});

module.exports = {
	index,
	book_list,
	book_detail,
	book_create_get,
	book_create_post,
	book_delete_get,
	book_delete_post,
	book_update_get,
	book_update_post,
};

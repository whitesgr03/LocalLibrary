const asyncHandler = require("express-async-handler");

const Book = require("../models/book");
const Author = require("../models/author");
const Genre = require("../models/genre");
const BookInstance = require("../models/bookinstance");

const index = asyncHandler(async (req, res, next) => {
	const [
		numBooks,
		numBookInstances,
		nunAvailableBookInstances,
		numAuthors,
		numGenres,
	] = await Promise.all([
		Book.countDocuments().exec(),
		BookInstance.countDocuments().exec(),
		BookInstance.countDocuments({ status: "Available" }).exec(),
		Author.countDocuments().exec(),
		Genre.countDocuments().exec(),
	]);


	res.render("index", {
		title: "Local Library Home",
		book_count: numBooks,
		book_instance_count: numBookInstances,
		book_instance_available_count: nunAvailableBookInstances,
		author_count: numAuthors,
		genre_count: numGenres,
	});
});
const book_list = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Book list");
});
const book_detail = asyncHandler(async (req, res, next) => {
	res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
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

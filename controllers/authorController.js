const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const Author = require("../models/author");
const Book = require("../models/book");

const author_list = asyncHandler(async (req, res, next) => {
	const allAuthors = await Author.find().sort({ family_name: 1 }).exec();

	res.render("author_list", {
		title: "Author List",
		author_list: allAuthors,
	});
});
const author_detail = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, ["title", "summary"]).exec(),
	]);

	const authorNotFound = () => {
		const err = new Error("Author not found");
		err.status = 404;
		return next(err);
	};

	author === null
		? authorNotFound()
		: res.render("author_detail", {
				author,
				author_books: allBooksByAuthor,
		  });
});
const author_create_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author create GET");
});
const author_create_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author create POST");
});
const author_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author delete GET");
});
const author_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author delete POST");
});
const author_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author update GET");
});
const author_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: Author update POST");
});

module.exports = {
	author_list,
	author_detail,
	author_create_get,
	author_create_post,
	author_delete_get,
	author_delete_post,
	author_update_get,
	author_update_post,
};

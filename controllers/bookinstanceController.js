const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");

const bookinstance_list = asyncHandler(async (req, res, next) => {
	const allBookInstances = await BookInstance.find()
		.sort({
			title: 1,
		})
		.populate("book")
		.exec();

	res.render("bookinstance_list", {
		title: "Book Instance List",
		bookinstance_list: allBookInstances,
	});
});
const bookinstance_detail = asyncHandler(async (req, res, next) => {
	const bookInstance = await BookInstance.findById(req.params.id)
		.populate("book")
		.exec();

	const bookInstanceNotFound = () => {
		const err = new Error("BookInstance not found");
		err.status = 404;
		return next(err);
	};

	bookInstance === null
		? bookInstanceNotFound()
		: res.render("bookInstance_detail", {
				title: "Book",
				bookInstance,
		  });
});
const bookinstance_create_get = asyncHandler(async (req, res, next) => {
	const allBooks = await Book.find({}, "title").sort({ title: 1 }).exec();

	res.render("bookinstance_form", {
		title: "Create BookInstance",
		book_list: allBooks,
	});
});
const bookinstance_create_post = [
	body("book", "Book must be specified.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("imprint", "Imprint must not be specified.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("status").escape(),
	body("due_back", "Invalid date")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),
	asyncHandler((req, res, next) => {
		const errors = validationResult(req);

		const bookinstance = new BookInstance({
			book: req.body.book,
			imprint: req.body.imprint,
			status: req.body.status,
			due_back: req.body.due_back,
		});

		const renderError = async () => {
			const allBooks = await Book.find({}, "title")
				.sort({ title: 1 })
				.exec();

			res.render("bookinstance_form", {
				title: "Create BookInstance",
				book_list: allBooks,
				bookinstance,
				errors: errors.array(),
			});
		};

		const isBookInstanceExists = async () => {
			const createBookInstance = async () => {
				await bookinstance.save();
				res.redirect(bookinstance.url);
			};

			const bookinstanceExists = await BookInstance.findOne({
				book: req.body.book,
				imprint: req.body.imprint,
				status: req.body.status,
				due_back: req.body.due_back,
			}).exec();

			bookinstanceExists
				? res.redirect(bookinstanceExists.url)
				: createBookInstance();
		};

		!errors.isEmpty() ? renderError() : isBookInstanceExists();
	}),
];
const bookinstance_delete_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance delete GET");
});
const bookinstance_delete_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance delete POST");
});
const bookinstance_update_get = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance update GET");
});
const bookinstance_update_post = asyncHandler(async (req, res, next) => {
	res.send("NOT IMPLEMENTED: BookInstance update POST");
});

module.exports = {
	bookinstance_list,
	bookinstance_detail,
	bookinstance_create_get,
	bookinstance_create_post,
	bookinstance_delete_get,
	bookinstance_delete_post,
	bookinstance_update_get,
	bookinstance_update_post,
};

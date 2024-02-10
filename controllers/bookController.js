const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
	const [authors, genres] = await Promise.all([
		Author.find().sort({ family_name: 1 }).exec(),
		Genre.find().sort({ name: 1 }).exec(),
	]);
	res.render("book_form", {
		title: "Create Book",
		authors,
		genres,
	});
});
const book_create_post = [
	body("title", "Title must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("author", "Author must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Summary must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
	body("genre.*").escape(),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const book = new Book({
			...req.body,
		});

		const renderError = async () => {
			const [authors, genres] = await Promise.all([
				Author.find().sort({ family_name: 1 }).exec(),
				Genre.find().sort({ name: 1 }).exec(),
			]);

			res.render("book_form", {
				title: "Create Book",
				authors,
				genres: genres.map(genre =>
					book.genre.includes(genre._id)
						? { ...genre._doc, checked: "true" }
						: genre
				),
				book,
				errors: errors.array(),
			});
		};

		const isBookExists = async () => {
			const bookExists = await Book.findOne({
				...req.body,
			}).exec();

			const createBook = async () => {
				await book.save();
				res.redirect(book.url);
			};

			bookExists ? res.redirect(bookExists.url) : createBook();
		};

		!errors.isEmpty() ? renderError() : isBookExists();
	}),
];
const book_delete_get = asyncHandler(async (req, res, next) => {
	const [book, allBookInstancesByBook] = await Promise.all([
		Book.findById(req.params.id, ["title"]).exec(),
		BookInstance.find({ book: req.params.id }).exec(),
	]);

	book === null
		? res.redirect("/catalog/books")
		: res.render("book_delete", {
				title: "Delete Book",
				book,
				book_bookInstances: allBookInstancesByBook,
		  });
});
const book_delete_post = asyncHandler(async (req, res, next) => {
	const [book, allBookInstancesByBook] = await Promise.all([
		Book.findById(req.params.id, ["title"]).exec(),
		BookInstance.find({ book: req.params.id }).exec(),
	]);

	const deleteBook = async () => {
		await Book.findByIdAndDelete(req.body.bookId).exec();
		res.redirect("/catalog/books");
	};

	book
		? allBookInstancesByBook.length > 0
			? res.render("book_delete", {
					title: "Delete Book",
					book,
					book_bookInstances: allBookInstancesByBook,
			  })
			: deleteBook()
		: res.redirect("/catalog/books");
});
const book_update_get = asyncHandler(async (req, res, next) => {
	const [book, authors, genres] = await Promise.all([
		Book.findById(req.params.id).exec(),
		Author.find().sort({ family_name: 1 }).exec(),
		Genre.find().sort({ name: 1 }).exec(),
	]);

	book === null
		? res.redirect("/catalog/books")
		: res.render("book_form", {
				title: "Update Book",
				book,
				authors,
				genres: genres.map(genre =>
					book.genre.includes(genre._id)
						? { ...genre._doc, checked: "true" }
						: genre
				),
		  });
});
const book_update_post = [
	body("title", "Title must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("author", "Author must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("summary", "Summary must not be empty.")
		.trim()
		.isLength({ min: 1 })
		.escape(),
	body("isbn", "ISBN must not be empty").trim().isLength({ min: 1 }).escape(),
	body("genre.*").escape(),
	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const book = new Book({
			_id: req.params.id,
			...req.body,
		});

		const renderError = async () => {
			const [authors, genres] = await Promise.all([
				Author.find().sort({ family_name: 1 }).exec(),
				Genre.find().sort({ name: 1 }).exec(),
			]);

			res.render("book_form", {
				title: "Update Book",
				authors,
				genres: genres.map(genre =>
					book.genre.includes(genre._id)
						? { ...genre._doc, checked: "true" }
						: genre
				),
				book,
				errors: errors.array(),
			});
		};

		const isBookExists = async () => {
			const bookExists = await Book.findOne({
				...req.body,
			}).exec();

			const updateBook = async () => {
				const updatedBook = await Book.findByIdAndUpdate(
					req.params.id,
					book
				);
				res.redirect(updatedBook.url);
			};

			bookExists ? res.redirect(bookExists.url) : updateBook();
		};

		!errors.isEmpty() ? renderError() : isBookExists();
	}),
];

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

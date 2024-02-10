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
const author_create_get = (req, res, next) => {
	res.render("author_form", { title: "Create Author" });
};
const author_create_post = [
	body("first_name")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("First name must be specified.")
		.isAlphanumeric()
		.withMessage("First name has non-alphanumeric characters."),
	body("family_name")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Family name must be specified.")
		.isAlphanumeric()
		.withMessage("Family name has non-alphanumeric characters."),
	body("date_of_birth", "Invalid date of birth")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),
	body("date_of_death", "Invalid date of death")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),
	asyncHandler((req, res, next) => {
		const errors = validationResult(req);
		const author = new Author({
			first_name: req.body.first_name,
			family_name: req.body.family_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death,
		});

		const isAuthorExists = async () => {
			const createAuthor = async () => {
				await author.save();
				res.redirect(author.url);
			};

			const authorExists = await Author.findOne({
				first_name: req.body.first_name,
				family_name: req.body.family_name,
				date_of_birth: req.body.date_of_birth,
				date_of_death: req.body.date_of_death,
			}).exec();

			authorExists ? res.redirect(authorExists.url) : createAuthor();
		};

		!errors.isEmpty()
			? res.render("author_form", {
					title: "Create Author",
					author,
					errors: errors.array(),
			  })
			: isAuthorExists();
	}),
];
const author_delete_get = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, ["title", "summary"]).exec(),
	]);

	author === null
		? res.redirect("/catalog/authors")
		: res.render("author_delete", {
				title: "Delete Author",
				author,
				author_books: allBooksByAuthor,
		  });
});
const author_delete_post = asyncHandler(async (req, res, next) => {
	const [author, allBooksByAuthor] = await Promise.all([
		Author.findById(req.params.id).exec(),
		Book.find({ author: req.params.id }, "title summary").exec(),
	]);

	const deleteAuthor = async () => {
		await Author.findByIdAndDelete(req.body.authorId).exec();
		res.redirect("/catalog/authors");
	};

	author
		? allBooksByAuthor.length > 0
			? res.render("author_delete", {
					title: "Delete Author",
					author,
					author_books: allBooksByAuthor,
			  })
			: deleteAuthor()
		: res.redirect("/catalog/authors");
});
const author_update_get = asyncHandler(async (req, res, next) => {
	const author = await Author.findById(req.params.id).exec();

	author === null
		? res.redirect("/catalog/authors")
		: res.render("author_form", {
				title: "Update author",
				author,
		  });
});
const author_update_post = [
	body("first_name")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("First name must be specified.")
		.isAlphanumeric()
		.withMessage("First name has non-alphanumeric characters."),
	body("family_name")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Family name must be specified.")
		.isAlphanumeric()
		.withMessage("Family name has non-alphanumeric characters."),
	body("date_of_birth", "Invalid date of birth")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),
	body("date_of_death", "Invalid date of death")
		.optional({ values: "falsy" })
		.isISO8601()
		.toDate(),
	asyncHandler((req, res, next) => {
		const errors = validationResult(req);
		const author = new Author({
			_id: req.params.id,
			first_name: req.body.first_name,
			family_name: req.body.family_name,
			date_of_birth: req.body.date_of_birth,
			date_of_death: req.body.date_of_death,
		});

		const isAuthorExists = async () => {
			const authorExists = await Author.findOne({
				first_name: req.body.first_name,
				family_name: req.body.family_name,
				date_of_birth: req.body.date_of_birth,
				date_of_death: req.body.date_of_death,
			}).exec();

			const updateAuthor = async () => {
				const updatedAuthor = await Author.findByIdAndUpdate(
					req.params.id,
					author
				);
				res.redirect(updatedAuthor.url);
			};

			authorExists ? res.redirect(authorExists.url) : updateAuthor();
		};

		!errors.isEmpty()
			? res.render("author_form", {
					title: "Update Author",
					author,
					errors: errors.array(),
			  })
			: isAuthorExists();
	}),
];

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

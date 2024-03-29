const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
		Book.find({ genre: req.params.id }, ["title", "summary"]).exec(),
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
const genre_create_get = (req, res, next) => {
	res.render("genre_form", { title: "Create genre" });
};
const genre_create_post = [
	body("name", "Genre name must contain at least 3 characters")
		.trim()
		.isLength({ min: 3 })
		.escape(),
	asyncHandler((req, res, next) => {
		const errors = validationResult(req);

		const genre = new Genre({ ...req.body });

		const isGenreExists = async () => {
			const createGenre = async () => {
				await genre.save();
				res.redirect(genre.url);
			};

			const genreExists = await Genre.findOne({
				...req.body,
			}).exec();

			genreExists ? res.redirect(genreExists.url) : createGenre();
		};

		!errors.isEmpty()
			? res.render("genre_form", {
					title: "Create Genre",
					genre,
					errors: errors.array(),
			  })
			: isGenreExists();
	}),
];
const genre_delete_get = asyncHandler(async (req, res, next) => {
	const [genre, allBooksByGenre] = await Promise.all([
		Genre.findById(req.params.id).exec(),
		Book.find({ genre: req.params.id }, ["title", "summary"]).exec(),
	]);

	genre === null
		? res.redirect("/catalog/genres")
		: res.render("genre_delete", {
				title: "Delete Genre",
				genre,
				genre_books: allBooksByGenre,
		  });
});
const genre_delete_post = asyncHandler(async (req, res, next) => {
	const [genre, allBooksByGenre] = await Promise.all([
		Genre.findById(req.params.id).exec(),
		Book.find({ genre: req.params.id }, "title summary").exec(),
	]);

	const deleteGenre = async () => {
		await Genre.findByIdAndDelete(req.body.genreId).exec();
		res.redirect("/catalog/genres");
	};

	genre
		? allBooksByGenre.length > 0
			? res.render("genre_delete", {
					title: "Delete Genre",
					genre,
					genre_books: allBooksByGenre,
			  })
			: deleteGenre()
		: res.redirect("/catalog/genres");
});
const genre_update_get = asyncHandler(async (req, res, next) => {
	const genre = await Genre.findById(req.params.id).exec();

	genre === null
		? res.redirect("/catalog/genres")
		: res.render("genre_form", {
				title: "Update genre",
				genre,
		  });
});
const genre_update_post = [
	body("name", "Genre name must contain at least 3 characters")
		.trim()
		.isLength({ min: 3 })
		.escape(),
	asyncHandler((req, res, next) => {
		const errors = validationResult(req);

		const genre = new Genre({ _id: req.params.id, ...req.body });

		const isGenreExists = async () => {
			const genreExists = await Genre.findOne({
				...req.body,
			}).exec();

			const updateGenre = async () => {
				const updatedGenre = await Genre.findByIdAndUpdate(
					req.params.id,
					genre
				);
				res.redirect(updatedGenre.url);
			};

			genreExists ? res.redirect(genreExists.url) : updateGenre();
		};

		!errors.isEmpty()
			? res.render("genre_form", {
					title: "Update Genre",
					genre,
					errors: errors.array(),
			  })
			: isGenreExists();
	}),
];

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

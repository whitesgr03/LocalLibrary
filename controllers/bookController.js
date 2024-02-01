const Book = require("../models/book");

const book_list = (req, res) => {
	res.send("NOT IMPLEMENTED: Book list");
};
const book_detail = (req, res) => {
	res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
};
const book_create_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Book create GET");
};
const book_create_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Book create POST");
};
const book_delete_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Book delete GET");
};
const book_delete_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Book delete POST");
};
const book_update_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Book update GET");
};
const book_update_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Book update POST");
};

module.exports = {
	book_list,
	book_detail,
	book_create_get,
	book_create_post,
	book_delete_get,
	book_delete_post,
	book_update_get,
	book_update_post,
};

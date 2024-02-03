const Author = require("../models/author");

const author_list = (req, res) => {
	res.send("NOT IMPLEMENTED: Author list");
};
const author_detail = (req, res) => {
	res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
};
const author_create_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Author create GET");
};
const author_create_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Author create POST");
};
const author_delete_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Author delete GET");
};
const author_delete_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Author delete POST");
};
const author_update_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Author update GET");
};
const author_update_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Author update POST");
};

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
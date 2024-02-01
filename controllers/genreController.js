const Genre = require("../models/genre");

const genre_list = (req, res) => {
	res.send("NOT IMPLEMENTED: Genre list");
};
const genre_detail = (req, res) => {
	res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
};
const genre_create_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Genre create GET");
};
const genre_create_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Genre create POST");
};
const genre_delete_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Genre delete GET");
};
const genre_delete_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Genre delete POST");
};
const genre_update_get = (req, res) => {
	res.send("NOT IMPLEMENTED: Genre update GET");
};
const genre_update_post = (req, res) => {
	res.send("NOT IMPLEMENTED: Genre update POST");
};

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

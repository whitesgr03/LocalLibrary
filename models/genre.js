const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GenreSchema = new Schema(
	{
		name: { type: String, required: true, minLengthL: 3, maxLength: 100 },
	},
	{
		virtuals: {
			url: {
				get() {
					return `/catalog/genre/${this._id}`;
				},
			},
		},
	}
);

const GenreModel = mongoose.model("Genre", GenreSchema);

module.exports = GenreModel;

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
	{
		first_name: { type: String, required: true, maxLength: 100 },
		family_name: { type: String, required: true, maxLength: 100 },
		date_of_birth: { type: Date },
		date_of_death: { type: Date },
	},
	{
		virtuals: {
			name: {
				get() {
					return (
						this.first_name &&
						this.family_name &&
						`${this.first_name}, ${this.family_name}`
					);
				},
			},
			url: {
				get() {
					return `/catalog/author/${this._id}`;
				},
			},
		},
	}
);

const AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports = AuthorModel;

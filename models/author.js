const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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
			lifeSpa: {
				get() {
					const birth = this.date_of_birth
						? DateTime.fromJSDate(
								this.date_of_birth
						  ).toLocaleString(DateTime.DATE_MED)
						: "";
					const death = this.date_of_death
						? DateTime.fromJSDate(
								this.date_of_death
						  ).toLocaleString(DateTime.DATE_MED)
						: "";

					return `${birth} - ${death}`;
				},
			},
			date_of_birth_yyyy_mm_dd: {
				get() {
					return DateTime.fromJSDate(this.date_of_birth).toISODate();
				},
			},
			date_of_death_yyyy_mm_dd: {
				get() {
					return DateTime.fromJSDate(this.date_of_death).toISODate();
				},
			},
		},
	}
);

const AuthorModel = mongoose.model("Author", AuthorSchema);

module.exports = AuthorModel;

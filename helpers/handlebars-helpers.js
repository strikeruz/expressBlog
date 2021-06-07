const register = function (Handlebars) {
	const helpers = {
		formatCurrency: function (currency) {
			return currency
				.toString()
				.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
		},
		format_date: function (date, format) {
			return moment(date).format(format);
		},
		ifcond: function (v1, operator, v2, options) {
			switch (operator) {
				case '==':
					return v1 == v2 ? options.fn(this) : options.inverse(this);

				case '!=':
					return v1 != v2 ? options.fn(this) : options.inverse(this);

				case '===':
					return v1 === v2 ? options.fn(this) : options.inverse(this);

				case '!==':
					return v1 !== v2 ? options.fn(this) : options.inverse(this);

				case '&&':
					return v1 && v2 ? options.fn(this) : options.inverse(this);

				case '||':
					return v1 || v2 ? options.fn(this) : options.inverse(this);

				case '<':
					return v1 < v2 ? options.fn(this) : options.inverse(this);

				case '<=':
					return v1 <= v2 ? options.fn(this) : options.inverse(this);

				case '>':
					return v1 > v2 ? options.fn(this) : options.inverse(this);

				case '>=':
					return v1 >= v2 ? options.fn(this) : options.inverse(this);

				default:
					return eval('' + v1 + operator + v2)
						? options.fn(this)
						: options.inverse(this);
			}
		},
		copyrightYear: function () {
			return new Date().getFullYear();
		}
	};

	if (Handlebars && typeof Handlebars.registerHelper === 'function') {
		for (let prop in helpers) {
			Handlebars.registerHelper(prop, helpers[prop]);
		}
	} else {
		return helpers;
	}
};
module.exports.register = register;
module.exports.helpers = register(null);

PT.Collections.Users = Backbone.Collection.extend({
	model: PT.Models.User,
	url: "/user_data"
});
PT.Collections.Posts = Backbone.Collection.extend({
	model: PT.Models.Post,
	url: "/posts"
});
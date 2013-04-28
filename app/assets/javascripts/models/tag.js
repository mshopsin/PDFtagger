PT.Models.Tag = Backbone.RelationalModel.extend({
	urlRoot: "/tags",
	relations: [
	{
	type: Backbone.HasMany,
	key: "posts",
	relatedModel: "PT.Models.Post",
	collectionType: "PT.Collections.Posts",
	
	keyDestination: "post_ids"
	
	}]
});
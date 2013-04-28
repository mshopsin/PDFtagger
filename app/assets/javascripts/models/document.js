PT.Models.Document = Backbone.RelationalModel.extend({
	urlRoot: "/documents",
	relations: [
	{
	type: Backbone.HasMany,
	key: 'tags',
	relatedModel: "PT.Models.Tag",
	collectionType: "PT.Collections.Tags",
	
	keyDestination: "tag_ids"


	}]
});
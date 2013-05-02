PT.Models.Document = Backbone.RelationalModel.extend({
	urlRoot: "/documents",
	relations: [
	{
	type: Backbone.HasMany,
	key: 'tags',
	relatedModel: "PT.Models.Tag",
	collectionType: "PT.Collections.Tags",
	
	keyDestination: "tag_ids"


	}],
	
	getBlobURL: function(callback) {
		$.get("/documents/" + this.id,
		function(data){
			var blob = new Blob([data], {"type":'application/pdf'});
			//var blobURL = URL.createObjectURL(blob);
			callback(data);
		}).fail(function() { alert("error"); });
	}
	
});
window.PT = {
	Views: {},
	Models: {},
	Routers: {},
	Collections: {},
	Widgets: {},
	Store: {},
	
	initialize: function($docs, $reader, $tags, docsJSON) {
		var documents = new PT.Collections.Documents(docsJSON, {parse: true});
		documents.fetch();
		console.log(documents);
		PT.Store.Documents = documents;
		PT.Store.Tags = new PT.Collections.Tags();
		PT.Store.Tags.fetch();
		PT.Store.Posts = new PT.Collections.Posts();
		PT.Store.Posts.fetch();
		new PT.Routers.DocumentRouter($docs, $reader, $tags, documents);
		Backbone.history.start();
	}

	
};
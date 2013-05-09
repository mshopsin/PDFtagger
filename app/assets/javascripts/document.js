window.PT = {
	Views: {},
	Models: {},
	Routers: {},
	Collections: {},
	Widgets: {},
	Store: {},
	Overlay: {},
	
	initialize: function($docs, $reader, $tags, docsJSON) {
		var documents = new PT.Collections.Documents(docsJSON);
		documents.fetch({
			success: function(data) {
				console.log(data);
			}
		});
		PT.Store.Documents = documents;
		PT.Store.Tags = new PT.Collections.Tags();
		PT.Store.Tags.fetch();
		PT.Store.Posts = new PT.Collections.Posts();
		PT.Store.Posts.fetch();
		PT.Store.Users = new PT.Collections.Users();
		PT.Store.Users.fetch();
		PT.Store.Document_Groups = new PT.Collections.Document_Groups();
		PT.Store.Document_Groups.fetch();
		PT.Store.Widgets = {};
		new PT.Routers.DocumentRouter($docs, $reader, $tags, documents);
		Backbone.history.start();
	}

	
};
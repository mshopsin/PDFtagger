PT.Routers.DocumentRouter = Backbone.Router.extend({
	initialize: function($docs, $reader, $tags, documents) {
		var that = this;
		that.$docs = $docs;
		that.$reader = $reader;
		that.$tags = $tags;
		that.documents = documents;
	},
	
	routes: {
		"": "redirectToDocuments",
		"documents": "listDocuments",
		"documents/:id": "showDocument",
		"tags": "listTags",
		"tags/:id": "tagsByDoc",
		//figure out how to use two ids
		"tags/:id/posts/:id": "postsForTag"
	},
	
	listDocuments: function(){
		var that = this;
		var view = new PT.Views.DocumentListView({
			collection: that.documents
		});
		this.$docs.html(view.render().$el);
	},
	
	showDocument: function(id) {
		console.log("open dang you");
		var document = this.documents.get(id);
		var readerView = new PT.Views.DocumentReaderView({
			model: document
		});
		console.log(readerView);
		console.log(readerView.render());
		this.$reader.html(readerView.render().$el);
		//Todo Show Tags
		
	},
	
	redirectToDocuments: function() {
		Backbone.history.navigate('#/documents')
	}
	
});
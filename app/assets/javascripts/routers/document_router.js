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
		"tags/:id": "getTag"
	},
	
	listDocuments: function(){
		var that = this;
		var view = new PT.Views.DocumentListView({
			collection: that.documents
		});
		this.$docs.html(view.render().$el);
	},
	
	showDocument: function(id) {
		var document = this.documents.get(id);
		var readerView = new PT.Views.DocumentReaderView({
			model: document
		});
		var tagsView = new PT.Views.DocumentTagsView({
			collection: PT.Store.Tags
		});
		tagsView.initialize(id);
		
		this.$reader.html(readerView.render().$el);
		this.$tags.html(tagsView.render().$el);
		this.listDocuments(); // for reload
	},
	
	redirectToDocuments: function() {
		Backbone.history.navigate('#/documents')
	},
	
	getTag: function(id) {
		var tag = PT.Store.Tags.get(id);
		var tagFactory = PT.Overlay.Tag;
		var $start  = $('#tag-listing');
		if(id in PT.Store.Widgets){
		  var tagObj = PT.Store.Widgets[id];
		  tagObj.show();
		} else {
   		  var tagObj = tagFactory.setupOverlay(this.$reader,$start,tag);
		  PT.Store.Widgets[id] = tagObj;
		}
			Backbone.history.navigate('#/');
	}

});
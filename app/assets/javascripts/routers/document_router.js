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
		"_=_": "redirectToDocuments",
		"documents": "listDocuments",
		"#documents": "listDocuments",
		"documents/:id": "showDocument",
		"tags": "listTags",
		"tags/:id": "getTag"
	},
	
	listDocuments: function(){
		var that = this;
		that.documents.fetch();
		var view = new PT.Views.DocumentListView({
			collection: that.documents
		});
		this.$docs.html(view.render().$el);
	},
	
	showDocument: function(id) {
		
		if(typeof this.documents == 'undefined' || this.documents.length == 0 || typeof this.documents.get(id) == 'undefined' ){
			console.log("navigating");
			this.navigate("/documents");
		}
		
		var document = this.documents.get(id);
		console.log(document);
		
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
		
		PT.Store.Widgets = {};
	},
	
	redirectToDocuments: function() {
		Backbone.history.navigate('#/documents');
	},
	
	getTag: function(id) {
		var tag = PT.Store.Tags.get(id);
		var tagFactory = PT.Overlay.Tag;
		var $start = $('.reader-container');
		var tagObj = new Object();
		if(id in PT.Store.Widgets){
		  tagObj = PT.Store.Widgets[id];
		  console.log
		  tagObj.show();
		} else {
   		  tagObj = tagFactory.setupOverlay(this.$reader,$start,tag);
		  PT.Store.Widgets[id] = tagObj;
		  tagObj.show();
		}
		
			Backbone.history.navigate('#/');
	}

});
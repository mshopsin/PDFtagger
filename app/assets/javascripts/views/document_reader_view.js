PT.Views.DocumentReaderView = Backbone.View.extend({
	events: {
		"click #set-selection": "createTag"
	},
	render: function() {
		var rendered = JST["documents/reader"]({
			document: this.model
		});
		this.$el.html(rendered);
		return this;
	},
	
	createTag: function() {
				console.log("create tag");
		event.preventDefault();
		 var tag = new PT.Models.Tag(this.makeTagParams());
		tag.save();
 		this.collection.add(tag);
		
	},
	
	makeTagParams: function(){
		var tag = {};
		
		
		
		return tag;
	}
	
});
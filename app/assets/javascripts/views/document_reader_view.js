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
		event.preventDefault();
		var tagObj = this.makeTagParams();
		var tag = {};
		tag.x_1 = tagObj.offset().left;
		tag.x_2 = tagObj.offset().left + tagObj.width();
		tag.y_1 = tagObj.offset().top;
		tag.y_2 = tagObj.offset().top + tagObj.height();
		tag.task = "untitled";
		tag.document_id = this.model.id;
		var tagM = new PT.Models.Tag(tag);
		tagObj.model = tagM;
		tagM.save();
 		PT.Store.Tags.add(tagM);
		this.render();
		
	},
	
	makeTagParams: function(){
		var $start  = $('#tag-listing');
		var $reader = $('.reader-container');
		var tagFactory = PT.Overlay.Tag;
		var tagObj = tagFactory.setupOverlay($reader,$start);
		
		return tagObj;
	}
	
});
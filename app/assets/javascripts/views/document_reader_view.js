PT.Views.DocumentReaderView = Backbone.View.extend({
	events: {
		"click #set-selection": "createTag",
		"click #destroy-document": "destroyDocument"
	},
	render: function() {
		var rendered = JST["documents/reader"]({
			document: this.model
		});
		var $frameView = $('<iframe id="frame-view" type="application/pdf" width=800px height="5000px" ></iframe>')
		this.model.getBlobURL( function(blob){
			$frameView.attr('src',blob);
		});
		
		this.$el.html(rendered);
		this.$el.find(".reader-container").append($frameView);
		return this;
	},
	destroyDocument: function(){
		this.model.destroy();
		this.$el.html("");
		return this;
	},
	
	createTag: function() {
		event.preventDefault();
		
		var tag = {};
		// tag.x_1 = tagObj.offset().left;
		// tag.x_2 =  tagObj.width();
		// tag.y_1 = tagObj.offset().top;
		// tag.y_2 =  tagObj.height();
		tag.task = "untitled";
		
		tag.document_id = this.model.id;
		var tagM = new PT.Models.Tag(tag);
		tagM.save();
		var tagObj = this.makeTagParams(tagM);
 		PT.Store.Tags.add(tagM);
		var $start = $('.reader-container');
		//var tagObj =  PT.Overlay.Tag.setupOverlay($start,$start,tagM);
		PT.Store.Widgets[tagM.id] = tagObj;
		//this.render();
		
		return tagObj;
		
	},
	
	makeTagParams: function(tag){
		var $start  = $('#frame-view');
		var $reader = $('.reader-container');
		var tagFactory = PT.Overlay.Tag;
		var tagObj = tagFactory.setupOverlay($reader,$reader,tag);
		
		return tagObj;
	}
	
});
PT.Views.DocumentListView = Backbone.View.extend({
	events: {
		"click #upload-doc": "uploadFile"
	},
	initialize: function() {
      this.collection.on('change', this.render.bind(this));
      this.collection.on('reset', this.render.bind(this));
      this.collection.on('add', this.render.bind(this));
      this.collection.on('remove', this.render.bind(this));
    },

    render: function() {
	   var rendered = JST["documents/list"]({
	   	documents: this.collection
	   });
	   this.$el.html(rendered);
	   return this;
	},
	
	uploadFile: function(){
		console.log("upload");
		var that = this;
		var file = $('#pdf-location')[0].files[0];
		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = shipOff;

		function shipOff(event) {
	    var result = event.target.result;
	    var fileName = $('#pdf-location')[0].files[0].name;
		$.post(
			'/documents.json',
			 {
				 document:  {title: fileName,
					      pdf_data: result }
			 }).always(function() {
				 		PT.Store.Documents.fetch();
				 		that.render();
				});
		}
	}
	
	
});
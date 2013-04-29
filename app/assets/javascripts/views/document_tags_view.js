PT.Views.DocumentTagsView = Backbone.View.extend({

	initialize: function(id){
		this.id = id;
		
	       PT.Store.Tags.on('change', this.render.bind(this));
	       PT.Store.Tags.on('reset', this.render.bind(this));
	       PT.Store.Tags.on('add', this.render.bind(this));
	       PT.Store.Tags.on('remove', this.render.bind(this));
		
	},

    render: function() {
	   var rendered = JST["documents/tags"]({
	   	tags:  this.collection.search(this.id)
	   });
	   this.$el.html(rendered);
	   return this;
	}
});
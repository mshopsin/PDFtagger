PT.Views.DocumentTagsView = Backbone.View.extend({


    render: function(id) {
	   var rendered = JST["documents/tags"]({
	   	tags: this.collection
	   });
	   this.$el.html(rendered);
	   console.log( this.collection.search(id));
	   return this;
	}
});
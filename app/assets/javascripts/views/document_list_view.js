PT.Views.DocumentListView = Backbone.View.extend({
    // initialize: function() {
 //      this.collection.on('change', this.render.bind(this));
 //      this.collection.on('reset', this.render.bind(this));
 //      this.collection.on('add', this.render.bind(this));
 //      this.collection.on('remove', this.render.bind(this));
 //    },

    render: function() {
	   var rendered = JST["documents/list"]({
	   	documents: this.collection
	   });
	   this.$el.html(rendered);
	   return this;
	}
});
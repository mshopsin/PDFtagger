PT.Views.DocumentReaderView = Backbone.View.extend({
	render: function() {
		var rendered = JST["documents/reader"]({
			document: this.model
		});
		this.$el.html(rendered);
		return this;
	}
});
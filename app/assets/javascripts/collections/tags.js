PT.Collections.Tags = Backbone.Collection.extend({
	model: PT.Models.Tag,
	url: "/tags",
	
	
	search : function(id){
			if(id == "") return this;
 
			return _(this.filter(function(data) {
			  	return (data.get('document_id') == id);
			}));
		}
	
});
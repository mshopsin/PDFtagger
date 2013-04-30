PT.Models.Tag = Backbone.RelationalModel.extend({
	urlRoot: "/tags",
	relations: [
	{
	type: Backbone.HasMany,
	key: "posts",
	relatedModel: "PT.Models.Post",
	collectionType: "PT.Collections.Posts",
	
	keyDestination: "post_ids"
	
	}],
	addPost: function(text){
		
		console.log("add post");
		var post = new PT.Models.Post({response: text, reply_to_id: this.replyPost(), tag_id: this.id });
		post.save();
		PT.Store.Posts.add(post);
	},
	
	replyPost: function(){
		
		if( PT.Store.Posts.where({ tag_id: this.id}).length == 0){
			console.log("none");
			return 0;
		} else {
			console.log("find");
			//find first with 0 reply_id
			var targetPost = PT.Store.Posts.findWhere({ tag_id: this.id, reply_to_id: 0 });
			var lastId = 0;
			while(typeof targetPost != 'undefined') {
				if(typeof targetPost.id == 'undefined'){
					break;
				}
				lastId = targetPost.get('id');
					console.log(lastId);
				targetPost = PT.Store.Posts.findWhere({tag_id: this.id,reply_to_id: lastId});
			} 
			return lastId;
		}
	},
	getPosts: function() {
		var targetPost = PT.Store.Posts.findWhere({ tag_id: this.id, reply_to_id: 0 });
		var listPosts = [];
		var lastId;
	    while(typeof targetPost != 'undefined') {
			
			if(typeof targetPost.id != 'undefined'){
				lastId = targetPost.get('id');
				listPosts.push(targetPost);
			} else {
				break;tar
			}
			targetPost = PT.Store.Posts.findWhere({tag_id: this.id, reply_to_id: lastId});
		};
		return listPosts;
	}
});
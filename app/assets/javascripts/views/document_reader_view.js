PT.Views.DocumentReaderView = Backbone.View.extend({
	events: {
		"click #set-selection": "createTag",
		"click #destroy-document": "destroyDocument",
		"click #submitBtn": "setDocGrp",
		"click #inviteEmail": "sendInvite"
	},
	render: function() {
		var rendered = JST["documents/reader"]({
			document: this.model,
			users: PT.Store.Users,
			docgrp : PT.Store.Document_Groups
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
	},
	
	setDocGrp: function(){
		
		var url = "/document_groups"; // the script where you handle the form input.

		    $.ajax({
		           type: "POST",
		           url: url,
		           data: $('#docGroup').serialize() , 
		           success: function(data)
		           {
		               //changes saved to document_group
		           }
		         });

		    return false; 
		
	},
	
	sendInvite: function(){
		var url = "/document_groups/new"; // the script where you handle the form input.
		var that = this;
		    $.ajax({
		           type: "GET",
				   dataType : 'json',
		           url: url,
		           data: $('#formEmail').serialize() }).always(
		   function(data)
		           {
		               $('#emailField').val('');
					   that.emailAlert("Email Sent");
		           });

		    return false; 
	},
	
	emailAlert: function(msg){
		var $msgBox = $('#emailAlert');
		var $alertBox = $("<div class='alert fade in'></div>");
		var $alertDismiss = $('<button type="button" class="close" data-dismiss="alert">x</button>');
		$alertBox.append($alertDismiss);
		$alertBox.append(msg);
		$msgBox.html($alertBox);
		
		$alertBox.fadeOut(2000, function() {
		    $alertBox.remove();
		  });
	}
	
	
	
});
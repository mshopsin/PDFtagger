PT.Overlay.Tag = (function() {
 
  var my = {};
  var count = 0;
  
  my.assignModel = function(model) {
	  this.model = model;
  }
  
  my.setupDialog = function($diag, $selection) {
	  $taskInputEl = $('<textarea class="inputTaskTextArea" type="text" name="task[text]" >' + $selection.model.get("task") + '</textarea>');
	  
	  var myTitle = ($selection.model.get("task") === "untitled") ? "Enter the Associated Task For this Section" : $selection.model.get("task");
	  
      $diag.dialog({modal:true, width: 800,height:400, title: myTitle,
	   buttons: [ { text: "Ok", click: function() { 
		  
		  var tag = $selection.model;
		  var taskText = $taskInputEl.val();
		  
		  if(tag.get('task') == "untitled") {
		  	tag.set({ task : taskText });
		  	tag.save();
	  	  } else {
			  console.log(tag);
			  tag.addPost(taskText);
	  	  }
	      
		  $( this ).dialog( "close" );
	   } } ] });
	   $('.ui-dialog-buttonpane').append($taskInputEl);
  		 	$diag.html(my.showPost($selection.model));
	  };
  
 my.showPost = function(tag) {
	 var $replies = $('<div></div>');
	 var $description = $('<dl class="dl-horizontal"></dl>');
	 var postList = tag.getPosts();
	 for ( var i = 0; i < postList.length; i++ ) {
		 $leftSide = $('<dt></dt>');
		 var authorID = postList[i].get('author_id');
		 var author_name = PT.Store.Users.where({'id': authorID})[0].get('email');
		 $leftSide.text(author_name);
		 $rightSide = $('<dd></dd>');
		 $rightSide.text(postList[i].get('response'));
		 $description.append($leftSide);
		 $description.append($rightSide);
	 }
	 $replies.append($description);
	 
	 return $replies;
  }
  
  my.setupOverlay = function($reader,$start, optionsModel){
	  	  var that = this;
		  
		  var dialogContentText = $("<p>Please Enter the task you want completed</p>");
		  var $moveBox =  $('<div></div>');
		  $moveBox.css({"position":"relative",
	  					"min-height":"100px"});
		  var $selection = $('<div class="Selection ui-widget-content" ></div>');
		  $moveBox.append($selection);
		  var $buttonRow = $('<div class="button-row"></div>');
		  $selection.append($buttonRow);
		  
		  $moveBox.css({
	      "position":"relative"
	  	  });
		 
		  if(typeof optionsModel != 'undefined') {
			  $selection.model = optionsModel;
			  console.log($selection.model);
			  var width = $selection.model.get("x_2");
			  var height = $selection.model.get("y_2");
			  $selection.css({
			       "position":"relative", 
				  "width": width + "px",
				  "height": height + "px", 
				  "top": $selection.model.get("y_1") + "px",
				  "left": $selection.model.get("x_1") + "px"
			  });
		  } else {
			   console.log("default");
			  $selection.css({ "position":"relative"});
			  $selection.css({"width":  "200px"});
			  $selection.css({"height": "100px"}); 
			  $selection.css({"top": "-5000px"});
			  $selection.css({"left": "100px"});
			  
		  }
		  
		  //close selection button 
		  var $closeSelectionButton = $('<button class="close-button selection-buttons"><i class="icon-remove-circle" ></i></button>');
		  $buttonRow.append($closeSelectionButton);
		  //event handler
		  $closeSelectionButton.click(function( event ){
			  event.preventDefault();
			  //Todo handle removing from set
				 $moveBox.css({"opacity":"0"});
		  });
		  //lock selection button
		  var locked = false;
		  var $lockSelectionButton = $('<button class="lock-button selection-buttons"></button>');
		  $lockSelectionButton.html('<i class="icon-lock" ></i>');
		  $buttonRow.append($lockSelectionButton);
		  $lockSelectionButton.click(function(){
			  if(!locked){
			  	$lockSelectionButton.html('<i class="icon-move" ></i>');
				$selection.draggable( 'disable' );
				$selection.resizable( 'disable' );
				locked = true;
			  } else {
			  	$lockSelectionButton.html('<i class="icon-lock" ></i>');
				$selection.draggable( 'enable' );
				$selection.resizable( 'enable' );
				locked = false;
			  }
		  });
		  
		  var $trashSelectionButton = $('<button class="trash-button selection-buttons"><i class="icon-trash" ></i></button>');
		  $trashSelectionButton.button({});
		  $buttonRow.append($trashSelectionButton);
		  $trashSelectionButton.click(function(){
			  if(typeof optionsModel != 'undefined') {
				 optionsModel.destroy();
			  }
				 
				 $selection.remove();
		  });
		  
		  
		   //comment button
	   		  var $commentButton = $('<button class="comment-button selection-buttons"><i class="icon-comment" ></i></button>');
	   		  $commentButton.button({});
	   		  $buttonRow.append($commentButton);
	   		  $commentButton.click(function(){
	   		  var $tagAnchor = $(".tag-anchor");
	   		  var $diag = $('<div class="anchorTag"></div>');
	   		  	$tagAnchor.append($diag);
	   		  	my.setupDialog( $diag, $selection);
	  	  });
	      $selection.draggable({
			  containment: $start,
			  stop: function() {
				    that.tag = $selection.model;
			  		that.tag.set({ x_1: $selection.position().left });
			  		that.tag.set({ y_1:  $selection.position().top });
			        that.tag.save();  
			        }});
	  	  $selection.resizable();
		  $selection.resize(function() {
       			    $selection.css({"position":"relative"});
					
				    that.tag = $selection.model;
			  		that.tag.set({ x_2: $selection.width() });
			  		that.tag.set({ y_2: $selection.height() });
			        that.tag.save();  
				});
					
		  // if(typeof optionsModel == 'undefined'){
		  // 			  $selection.css({ "position":"relative",
		  // 			  				   "top":"-5000px",
		  // 						       "left":"0px",
		  // 						   		"width":"200px",
		  // 								"height":"200px"});
		  //  			  $moveBox.css({ "position":"relative",
		  //  			  				   "top":"0px",
		  //  						       "left":"0px"});
		  // }	
  		  	$start.append($moveBox);//new tag
 // 

		  return $moveBox;
	  };
	  //todo return tag
	return my;
})();
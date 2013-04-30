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
		 $leftSide.text(postList[i].get('author_id'));
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
		  var $selection = $('<div id="Selection" class="ui-widget-content" ></div>');
		  var $buttonRow = $('<div class="button-row"></div>');
		  $selection.append($buttonRow);
		  
		  if(typeof optionsModel != 'undefined') {
			  $selection.model = optionsModel;
			  console.log(optionsModel);
			  console.log( $selection.model.get("y_1") );

			  console.log( $selection.model.get("x_1") );
			  var width = $selection.model.get("x_2") - $selection.model.get("x_1");
			  var height = $selection.model.get("y_2") - $selection.model.get("y_1");
			  $selection.css({
			      "position":"absolute", 
			      "top": $selection.model.get("y_1") + "px",
			      "left": $selection.model.get("x_1") + "px",
				  "width": width + "px",
				  "height": height + "px"
			  });
			  
		  } else {
	  		  $selection.css({top: '10px',
		  					  left: '10px'});
		  };
		  
		  //close selection button
		  var $closeSelectionButton = $('<button class="close-button selection-buttons"></button>');
		  $closeSelectionButton.button({ icons: { primary: "ui-icon-circle-close"} });
		  $buttonRow.append($closeSelectionButton);
		  //event handler
		  $closeSelectionButton.click(function(){
			  //Todo handle removing from set
				 $selection.remove();
		  });
		  //lock selection button
		  var locked = false;
		  var $lockSelectionButton = $('<button class="lock-button selection-buttons"></button>');
		  $lockSelectionButton.button({ icons: {primary: "ui-icon-locked" }, text: false });
		  $buttonRow.append($lockSelectionButton);
		  $lockSelectionButton.click(function(){
			  if(!locked){
			  	$lockSelectionButton.button({ icons: {primary: "ui-icon-unlocked" } });
				$selection.draggable( 'disable' );
				$selection.resizable( 'disable' );
				locked = true;
			  } else {
			  	$lockSelectionButton.button({ icons: {primary: "ui-icon-locked" } });
				$selection.draggable( 'enable' );
				$selection.resizable( 'enable' );
				locked = false;
			  }
		  });
		  
		  var $trashSelectionButton = $('<button class="trash-button selection-buttons"></button>');
		  $trashSelectionButton.button({ icons: { primary: "ui-icon-trash" }, text: false });
		  $buttonRow.append($trashSelectionButton);
		  $trashSelectionButton.click(function(){
			  if(typeof optionsModel != 'undefined') {
				 optionsModel.destroy();
			  }
				 
				 $selection.remove();
		  });
		  
		  
		   //comment button
	   		  var $commentButton = $('<button class="comment-button selection-buttons"></button>');
	   		  $commentButton.button({ icons: {primary: "ui-icon-comment" } });
	   		  $buttonRow.append($commentButton);
	   		  $commentButton.click(function(){
	   		  var $tagAnchor = $(".tag-anchor");
	   		  var $diag = $('<div class="anchorTag"></div>');
	   		  	$tagAnchor.append($diag);
	   		  	my.setupDialog( $diag, $selection);
	  	  });
	      $selection.draggable({
			  containment: "window",
			  stop: function() {
				    var tag = $selection.model;
			  		tag.set({ x_1: $selection.position().left });
			  		tag.set({ x_2: $selection.position().left + $selection.width() });
			  		tag.set({ y_1: $selection.position().top });
			  		tag.set({ y_2: $selection.position().top  + $selection.height() });
			        tag.save();  
			        }});
	  	  $selection.resizable();
		  $selection.resize(
			   function() {
				    var tag = $selection.model;
			  		tag.set({ x_1: $selection.position().left });
			  		tag.set({ x_2: $selection.position().left + $selection.width() });
			  		tag.set({ y_1: $selection.position().top });
			  		tag.set({ y_2: $selection.position().top  + $selection.height() });
			        tag.save();  
			        });
		  $start.append($selection);
		  return $selection;
	  };
	  //todo return tag
	return my;
})();
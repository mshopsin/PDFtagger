PT.Overlay.Tag = (function() {
 
  var my = {};
  var count = 0;
  var $bodyTag = $('#pdf-reader');
  my.setupOverlay = function(){
		  var dialogContentText = $("<p>Please Enter the task you want completed</p>"); 
		  var $selection = $('<div id="Selection" class="ui-widget-content" ></div>');
		  var $buttonRow = $('<div class="button-row"></div>');
		  $selection.append($buttonRow);
		  $selection.draggable();
		  $selection.resizable();
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
		  //comment button
		  var $commentButton = $('<button class="comment-button selection-buttons"></button>');
		  $commentButton.button({ icons: {primary: "ui-icon-comment" } });
		  $buttonRow.append($commentButton);
		  $commentButton.click(function(){
			  
	     var $diag = $(".nav-bar").dialog({modal:true, width: 800,height:400, title: "Enter the Associated Task For this Section",
		  buttons: [ { text: "Ok", click: function() { $( this ).dialog( "close" ); } } ] });
	  	 var $taskInputEl = $('<textarea class="inputTaskTextArea" type="text" name="task[text]" ></textarea>');
		 	//  $taskInputEl.resizable( 'disable' );
		  	if($diag.find('.inputTaskTextArea').size() == 0 ){
	  		 	$diag.append($taskInputEl);
	   		}
		  });
		  $bodyTag.append($selection);
	      $selection.draggable();
	  	  $selection.resizable();
		  
		  return $selection;
	  }
	  //todo return tag
	return my;
})();
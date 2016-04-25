var startX, startY;
var endX, endY;
var divHeight = 12;

//$('#source-form').mousedown(function(e) {
onmousedown = function(e) {
	startX = e.pageX; 
	startY = e.pageY;

	if (e.target.tagName != 'DIV') {
		return;
	}

	if (!$(e.target).hasClass('field')) {
		unselect();
	}
};

//$('#source-form').mouseup(function(e) {
onmouseup = function(e) {
	if (e.target.tagName == 'DIV') {
		endX = e.pageX; 
		endY = e.pageY;

		genField();
	}
};

onkeyup = function(e) {
	var key = e.keyCode;
	var ctrlKey = e.ctrlKey;

	//console.log(e);
	//console.log('keyup: keycode=' + key + ', ' + 'ctrl=' + ctrlKey);

	var current = currentField();

	if (ctrlKey) {
		if (key == 90) { // Ctrl-Z
			//current.remove(); // Undo
		} else if (key == 39) { // Right
			current.css({'width': "+=1px"});
		} else if (key == 37) { // Left
			current.css({'width': "-=1px"});
		}
	} else {
		if (key == 39) { // Right
			current.css({'left': "+=1px"});
		} else if (key == 37) { // Left
			current.css({'left': "-=1px"});
		} else if (key == 38) { // Up
			current.css({'top': "-=1px"});
		} else if (key == 40) { // Down
			current.css({'top': "+=1px"});
		} else if (key == 27) { // ESC
			// press ESC
		} else if (key == 46) { // Delete
			if ($('.selected').length > 0) {
				$('.selected').remove();
				indexFields();
			}
		}
	}
};

onkeypress = function(e) {
	//console.log(e);
}

onkeydown = function(e) {
	// prevent page scrolling on keypress
	var key = e.keyCode;
	if (key >= 37 && key <= 40) { // Arrow Key
		e.preventDefault();
		e.stopPropagation();
		e.returnValue = false; 
	}
}

// create a div and add it to document
function genField() {
	var divTop = startY - divHeight;
	var divLeft = startX;
	var divWidth = endX - startX;

	if (divWidth < 5) {
		return;
	}

	$('<div/>', { class: 'field' })
	.css({
		top: divTop + "px",
		left: divLeft + "px",
		width: divWidth + "px"
	})
	.attr('title', fieldType())
	.appendTo("#source-form")
	.click(function(e) {
		select($(this), e);
	});

	$.data(lastField(), 'type', fieldType());

	indexFields();
}

function indexFields() {
	$('.field').each(function(index) {
		$(this).text(index + 1);
	});
}

function currentField() {
	var current = $('.selected');
	if (current.length == 0) {
		current = lastField(); 
	}
	return current;
}

function lastField() {
	return $('.field:last-child');
}

function select(el, evt) {
	if (!evt.ctrlKey) {
		unselect();
	}
	el.addClass('selected');
}

function unselect() {
	$('.selected').removeClass('selected');
}


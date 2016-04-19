String.prototype.repeat= function(n) {
	return Array(n+1).join(this);
}

String.prototype.format = function () {
	var args = arguments;
	return this.replace(/{(\d+)}/g, function (match, number) {
		return typeof args[number] != 'undefined' ? args[number] : match;
	});
};

function formatCode(lines) {
	var indentLevel = 0;

	for (var i=0; i<lines.length; i++) {
		var line = lines[i].replace(/^\s+/g, '');

		var c = line.charAt(0); // first char
		if ("])}".indexOf(c) != -1) {
			indentLevel--;
		}

		lines[i] = "\t".repeat(indentLevel) + line;

		c = line.charAt(line.length-1); // last char
		if ("([{".indexOf(c) != -1) {
			indentLevel++;
		}
	}

	return lines;
}

function showCode(code, append = false) {
	var textarea = document.getElementById('output');

	if (append) {
		textarea.value += formatCode(code).join("\n");
	} else {
		textarea.value = formatCode(code).join("\n");
	}

	textarea.select();
	document.execCommand('copy'); // copy code to clipboard
}

function showAllPositions() {
	var el = $('.selected');
	if (el.length == 0) {
		el = $('.dummy');
	}

	var lines = [];

	el.each(function(index) {
		lines.push(genPosition(
			$(this).css('top').slice(0, -2), // remove 'px'
			$(this).css('left').slice(0, -2),
			$(this).css('width').slice(0, -2),
			0,
			$(this).text()
		).join("\n"));
	});

	showCode(lines);
}

// generate code
function genPosition(top, left, width, height, index) {
	lines = [];

	if (index) {
		lines.push("// div." + index);
	}

	lines.push("new Position([");
	lines.push("  'top' => " + top + ",");
	lines.push("  'left' => " + left + ",");
	lines.push("  'width' => " + width);

	if (height) {
		lines.push("  'height' => " + height);
	}

	lines.push("]),\n");

	return formatCode(lines);
}

function descriptorType() {
	return $("#descriptor option:selected").val();
}

function descriptorText() {
	return $("#descriptor option:selected").text();
}

function genStringDescriptor() {
	var divs = $('.selected');
	if (divs.length == 0) {
		return;
	}

	var lines = [];

	lines.push("new Descriptors\\StringDescriptor([");
	lines.push("  'caption' => 'XXX',"),
	lines.push("  'positions' => [");

	divs.each(function() {
		var top = $(this).css('top').slice(0, -2); // remove 'px'
		var left = $(this).css('left').slice(0, -2);
		var width = $(this).css('width').slice(0, -2);

		lines.push("new Position([");
		lines.push("  'top' => " + top + ",");
		lines.push("  'left' => " + left + ",");
		lines.push("  'width' => " + width);
		lines.push("]),");
	});

	lines.push("  ],");
	lines.push("  'callbacks' => [],");
	lines.push("]),\n");
	
	showCode(lines);
}

function genDateDescriptor() {
	var divs = $('.selected');
	if (divs.length == 0) {
		return;
	}

	var lines = [];

	lines.push("new Descriptors\\DateDescriptor([");
	lines.push("  'caption' => 'Date of',");
	lines.push("  'items' => [");

	divs.each(function(index) {
		var top = $(this).css('top').slice(0, -2); // remove 'px'
		var left = $(this).css('left').slice(0, -2);
		var width = $(this).css('width').slice(0, -2);

		if (index == 0) {
			lines.push("new Descriptors\\DateDescriptorItem([");
			lines.push("  'format' => DateFormat::DAY_TH,");
		}

		if (index == 1) {
			lines.push("new Descriptors\\DateDescriptorItem([");
			lines.push("  'format' => DateFormat::MONTH_FULL,");
		}

		if (index == 2) {
			lines.push("new Descriptors\\DateDescriptorItem([");
			lines.push("  'format' => DateFormat::YEAR_HALF,");
		}

		lines.push("'position' => new Position([");
		lines.push("  'top' => " + top + ",");
		lines.push("  'left' => " + left + ",");
		lines.push("  'width' => " + width);
		lines.push("])");

		lines.push("]),");
	});

	lines.push("  ],");
	lines.push("  'callbacks' => []");
	lines.push("]),\n");
	
	showCode(lines);
}

function genNumberDescriptor() {
	var divs = $('.selected');
	if (divs.length == 0) {
		return;
	}

	var lines = [];

	lines.push("new Descriptors\\NumberDescriptor([");
	lines.push("  'format' => NumberFormat::CURRENCY,");
	lines.push("  'caption' => 'Price of',");

	divs.each(function(index) {
		var top = $(this).css('top').slice(0, -2); // remove 'px'
		var left = $(this).css('left').slice(0, -2);
		var width = $(this).css('width').slice(0, -2);

		lines.push("'position' => new Position([");
		lines.push("  'top' => " + top + ",");
		lines.push("  'left' => " + left + ",");
		lines.push("  'width' => " + width);
		lines.push("]),");
	});

	lines.push("  'callbacks' => []");
	lines.push("]),\n");
	
	showCode(lines);
}

function genSignatureField() {
	var divs = $('.selected');
	if (divs.length == 0) {
		return;
	}

	var lines = [];

	lines.push("new SignatureField([");

	divs.each(function(index) {
		var top = $(this).css('top').slice(0, -2); // remove 'px'
		var left = $(this).css('left').slice(0, -2);
		var width = $(this).css('width').slice(0, -2);

		if (index == 0) {
			lines.push("'position' => new Position([");
			lines.push("  'top' => " + top + ",");
			lines.push("  'left' => " + left + ",");
			lines.push("  'width' => " + width + ",");
			lines.push("  'height' => 23");
			lines.push("]),");
		}

		if (index == 1) {
			lines.push("'position_date' => new Position([");
			lines.push("  'top' => " + top + ",");
			lines.push("  'left' => " + left + ",");
			lines.push("  'width' => " + width + ",");
			lines.push("  'height' => 23");
			lines.push("]),");
		}
	});

	lines.push("  'type' => SignatureFieldType::INITIALS,");
	lines.push("  'roles' => [");
	lines.push("     new DealRoleMap([");
	lines.push("       'party_type' => DealPartyType::RECEIVING,");
	lines.push("       'role_tag' => DealRoleTag::PARTY_REP_PRIMARY,");
	lines.push("     ])");
	lines.push("  ]");
	lines.push("]),\n");
	
	showCode(lines);
}

function genTelephoneDescriptor() {
	var divs = $('.selected');
	if (divs.length == 0) {
		return;
	}

	var lines = [];

	lines.push("new Descriptors\\TelephoneDescriptor([");
	lines.push("  'caption' => 'Telephone',");
	lines.push("  'format' => StringFormat::TELEPHONE,");
	lines.push("  'items' => [");
	lines.push("    new Descriptors\\TelephoneDescriptorItem([");
	lines.push("      'format' => TelephoneFormat::CANADIAN,");

	divs.each(function(index) {
		var top = $(this).css('top').slice(0, -2); // remove 'px'
		var left = $(this).css('left').slice(0, -2);
		var width = $(this).css('width').slice(0, -2);

		lines.push("'position' => new Position([");
		lines.push("  'top' => " + top + ",");
		lines.push("  'left' => " + left + ",");
		lines.push("  'width' => " + width + ",");
		lines.push("]),");
	});

	lines.push("    ]),");
	lines.push("  ]");
	lines.push("]),\n");
	
	showCode(lines);
}

function genRadioDescriptor() {
	var divs = $('.selected');
	if (divs.length == 0) {
		return;
	}

	var lines = [];

	lines.push("new Descriptors\\RadioDescriptor([");
	lines.push("	'caption' => 'XXX',");
	lines.push("	'items' => [");
	lines.push("		new Descriptors\\RadioDescriptorItem([");
	lines.push("			'select_option' => new SelectOption([");
	lines.push("				'caption' => 'XXX'");
	lines.push("			])");
	lines.push("		]),");
	lines.push("		new Descriptors\\RadioDescriptorItem([");
	lines.push("			'select_option' => new SelectOption([");
	lines.push("				'caption' => 'XXX'");
	lines.push("			])");
	lines.push("		])");
	lines.push("	],");
	lines.push("	'is_preview' => false,");
	lines.push("	'is_prerequisite' => true,");
	lines.push("]),\n");

	showCode(lines);
}

function genClausesDescriptor() {
}

function genImageDescriptor() {
}

function genCheckboxDescriptor() {
	var divs = $('.selected');
	if (divs.length == 0) {
		return;
	}

	var lines = [];

	divs.each(function(index) {
		var top = $(this).css('top').slice(0, -2); // remove 'px'
		var left = $(this).css('left').slice(0, -2);
		var width = $(this).css('width').slice(0, -2);

		lines.push("new Descriptors\\CheckboxDescriptor([");
		lines.push("	'caption' => 'Checkbox',");
		lines.push("	'position' => new Position([");
		lines.push("		'top' => " + top + ",");
		lines.push("		'left' => " + left + ",");
		lines.push("		'width' => " + width + ",");
		lines.push("		'height' => 15");
		lines.push("	])");
		lines.push("]),");
	});

	showCode(lines);
}

function genSelectDescriptor() {
}

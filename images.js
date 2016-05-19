var IMAGE_PATH = 'import/source-forms/';
var IMAGE_PATH = 'file:///src/code/app-core/import/source-forms/lstar/gif/';
var IMAGE_PATH = 'file:///src/code/app-core/import/source-forms/treb/gif/';
var IMAGE_PATH = 'file:///src/code/app-core/import/source-forms/orea/gif/';

var images = [
	"OREA Form 590 [2016]-0",
	"OREA Form 590 [2016]-1",
	"OREA Form 590 [2016]-2",
	"OREA Form 590 [2016]-3",
	"",
	"OREA Form 592 [2016]-0",
	"OREA Form 592 [2016]-1",
	"OREA Form 592 [2016]-2",
	"OREA Form 592 [2016]-3",
	"",
	"OREA Form 601 [2016]-0",
	"OREA Form 601 [2016]-1",
	"OREA Form 601 [2016]-2",
	"OREA Form 601 [2016]-3",
	"",
	"OREA Form 540 [2016]-0",
	"OREA Form 540 [2016]-1",
	"OREA Form 540 [2016]-2",
	"",
	"OREA Form 632 [2016]-0",
	"OREA Form 632 [2016]-1",
	"OREA Form 632 [2016]-2",
	"OREA Form 632 [2016]-3",
	"",
	"OREA Form 639 [2015]-0",
	"OREA Form 639 [2015]-1",
	"OREA Form 639 [2015]-2",
	"OREA Form 639 [2015]-3",

/*
	"OREA Form 660 [2016]-0", // checkbox/signature
	"OREA Form 660 [2016]-1",
	"",
	"OREA Form 633 [2015]-0",
	"OREA Form 633 [2015]-1",
	"OREA Form 633 [2015]-2",
	"OREA Form 633 [2015]-3",
	"OREA Form 633 [2015]-4",
	"",
	"OREA Form 560 [2016]",
	"OREA Form 600 [2016]",
	"OREA Form 650 [2016]",
	"OREA Form 651 [2016]",

	"OREA Form 565 [2016]-0",
	"OREA Form 565 [2016]-1",

	"OREA Form 545 [2016]-0",
	"OREA Form 545 [2016]-1",
	"OREA Form 545 [2016]-2",

	"OREA Form 541 [2016]", // string/date/signature
	"OREA Form 543 [2016]",
	"OREA Form 642 [2016]",
*/
];

function imageUrl(img) {
	return "url('" + IMAGE_PATH + img + ".gif')";
}

function fillImageList() {
	$.each(images, function (index, img) {
		$('#bkimgs').append($('<option>', { 
			text : img
		}));
	});
}

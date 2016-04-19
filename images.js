var IMAGE_PATH = 'import/source-forms/';
var IMAGE_PATH = 'file:///src/code/app-core/import/source-forms/gif/flat/';

var images = [
	"OREA Form 601 [2016]-0",
	"OREA Form 601 [2016]-1",
	"OREA Form 601 [2016]-2",
	"OREA Form 601 [2016]-3",

	"",
	"OREA Form 632 [2016]-0",
	"OREA Form 632 [2016]-1",
	"OREA Form 632 [2016]-2",
	"OREA Form 632 [2016]-3",

	"",
	"OREA Form 633 [2015]-0",
	"OREA Form 633 [2015]-1",
	"OREA Form 633 [2015]-2",
	"OREA Form 633 [2015]-3",
	"OREA Form 633 [2015]-4",
/*
	"",
	"OREA Form 560 [2016]",
	"OREA Form 600 [2016]",
	"OREA Form 650 [2016]",
	"OREA Form 651 [2016]",

	"",
	"OREA Form 565 [2016]-0",
	"OREA Form 565 [2016]-1",

	"",
	"OREA Form 545 [2016]-0",
	"OREA Form 545 [2016]-1",
	"OREA Form 545 [2016]-2",
*/
];

function imageUrl(img) {
	return "url('" + IMAGE_PATH + img + ".gif')";
}

function fillImageList() {
	$.each(images, function (index, img) {
		$('#bkimglist').append($('<option>', { 
			text : img
		}));
	});
}

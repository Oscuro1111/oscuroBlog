$(document).ready(function() {
	var activeContent = [];
	var cards = $('div.card');

	var add_ = null;
	var click_ = null;
	var hover_ = [];
	var remove = null;
	cards.each((index, ele) => {
		$(ele).hover(
			(e => {
				hover_.push(e);
				return e;
			})(function() {
				// over

				$(this)
					.find('span#btn')
					.css({ visibility: 'visible' });
				$(this).css({ 'border-style': 'dashed', 'border-width': '5px', 'border-color': 'lightgreen' });
			}),
			(e => {
				hover_.push(e);
				return e;
			})(function() {
				// out
				$(this)
					.find('span#btn')
					.css({ visibility: 'hidden' });
				$(this).css({ 'border-style': '', 'border-width': '', 'border-color': '' });
			})
		);

		//Adding Editor
		$(ele)
			.find('span.card-edit')
			.click(
				(e => {
					click_ = e;
					return e;
				})(function(event) {
					if (activeContent.length == 0) {
						event.preventDefault();
						var parent = this.parentNode.parentNode;
						var textEditor = $('.editor>.textEditor');

						var box = $('div#textBox');

						box[0].innerHTML = $(this.parentNode).children()[0].innerHTML;

						activeContent.push($(this.parentNode).detach());
						$(textEditor)
							.find('button')
							.css({ visibility: 'visible' });

						$(textEditor).css({ visibility: 'visible' });
						$(parent).append(textEditor);
					}
				})
			);

		$(ele)
			.find('span.card-remove')
			.click(
				(e => {
					remove = e;
					return e;
				})(function($event) {
					$event.preventDefault();
					var componet = this.parentNode.parentNode;
					$(componet).remove();
				})
			);

		$('.textEditor button#btn-done').click(function($event) {
			$event.preventDefault();
			if (activeContent.length == 1) {
				var textEditor = $('.textEditor');
				var textBox = $('#textBox');

				var parent = textEditor[0].parentNode;
				var data = textBox[0].innerHTML;
				textBox[0].innerHTML = '';

				$(textEditor)
					.find('button')
					.css({ visibility: 'hidden' });
				$(textEditor).css({ visibility: 'hidden' });
				$('div.editor').append($(textEditor).detach());

				var childs = $(activeContent[0]).children();
				childs[0].innerHTML = data;
				$(parent).append(activeContent.pop());
			}
		});
	});

	$('span.card-add').click(
		(e => {
			add_ = e;
			return e;
		})(function($event) {
			$event.preventDefault();

			var parent = this.parentNode.parentNode;
			var clon = $(parent).clone();

			$(clon)
				.find('span')
				.css({ visibility: 'hidden' });

			$(clon).css({ 'border-style': '', 'border-width': '', 'border-color': '' });
			$(clon).hover(hover_[0], hover_[1]);
			$(clon)
				.find('span.card-edit')
				.click(click_);
			$(clon)
				.find('span.card-add')
				.click(add_);
			$(clon)
				.find('span.card-remove')
				.click(remove);
			$('#postContent').append('<p></p>');
			$('#postContent').append(clon);
		})
	);

	var importImage = $('#importImage');
	setImage(importImage);
	//var old =$.cleanData;
	//$.cleanData=function(ele){

	//  console.log(ele);

	//   old(ele);
	//}

	$('#submit-btn').click(function(event) {
		event.preventDefault();
		var container = $('#postContent');
		var coverImg = $('div#cover-image')
			.find('img')
			.attr('src');

		if (coverImg == undefined || coverImg == null || coverImg == '')
			alert('Please select the cover image of your  post .');
		else{
            
            $('div#cover-image').remove();
			$.post(
				'/getPost',
				{ doc: container[0].innerHTML, title: $('h2#postTitle')[0].innerText, coverImg: coverImg },
				function(res) {

                    $("#main").remove();
                    $("body").append(res.data);
				}
            );
        }
	});
});

function setImage(importImage) {
	$(importImage).click(event => {
		event.preventDefault();

		window.open('https://oscuro.herokuapp.com/createPost/uploadImg.html');
	});
}

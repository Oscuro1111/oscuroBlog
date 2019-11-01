$(document).ready(function () {
	var postHandler = (function ($_) {
		var posts = $_('div#posts');

		return function (type) {
			switch (type) {
				case 'posts':
					putPost(posts, $_);
					break;

				case 'loadMore':
					loadMorePosts(posts, $_); break;

				default:
					return;
			}
		};
	})($);

	setTimeout(postHandler, 100, 'posts');
});

function putPost(posts_, $_) {
	$_.ajax({
		type: 'GET',
		url: '/post',
		data: {},
		dataType: 'json',
		success: function (data) {
			console.log(data);

			var posts = data.posts;
			for (let i = 0; i < data.posts.length; i++) {

				console.log(data);

				let post =
					" <div class='card' id='db - 1'>" +
					"<p style='color:blue;'>" + posts[i].date + "</p>" +
					"<p id='author' style='color:green; font-size:20px;'>By:" + posts[i].author.userName + "</p>" +
					"<img class='img-thumbnail' src='" + posts[i].img+"' alt='' height='300px' width='300px'>" +
					"<div class='card-body'>" +
					"<h3 class='card-title'>"+posts[i].title+"</h3>" +
					"<h4><a href='/posts/?path="+posts[i].body+"'>Read .</a></h4>"+
					'</div>' 
					+'</div>';

				$(posts_).append(post);
			}
		},
	});
	//load  post
}

function loadMorePosts(posts, $_) {
	//Load More post
}



$(document).ready(function () {
	var postHandler = (function ($_) {
		var posts = $_('nav#mySidebar');

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

                
           let post = "<a class='w3-bar-item w3-button w3-hover-black' href='/posts/?path="+posts[i].body+ "'>"+posts[i].title+"</a>";
          

			 	$(posts_).append(post);
			}
		},
	});
	//load  post
}

function loadMorePosts(posts, $_) {
	//Load More post
}

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

				let post =  "</br><a href='/posts/?path="+posts[i].body+"&"+"img="+posts[i].img+"&"+"title="+posts[i].title+"'><div class='w3-third w3-container w3-margin-bottom'>"+
				"<span><b>By: "+posts[i].author.userName+"</b></span>"+
				"<p><b>Posted on:"+posts[i].date+"</b></p>"+
			   "<img src='"+posts[i].img+"' alt='' style='width:100%' class='w3-hover-opacity'>"+
				"<div class='w3-container w3-white'>"+
				"<span style='background-color:lightgreen'>"+
				 "<h4 style='text-align:center;padding:2px;fonst-size:5vm'>"+posts[i].title+"</h4></a></span>"+
				"</div>"+
			  "</div>";                           
					

				$(posts_).append(post);
			}
		},
	});
	//load  post
}

function loadMorePosts(posts, $_) {
	//Load More post
}

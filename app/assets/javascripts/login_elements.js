$(document).ready(function () {
	$('#log-out').click( function () {
		$.ajax({
		  url: "/users/sign_out",
		  type: "DELETE",
		 	success: function (response) {
				$('#user-email').addClass('invisible');
				$('#log-out').addClass('invisible');
				$('#log-in').removeClass('invisible');
		  }
		});	
	});
	
	$('#log-in').click(function () {
		$('#login-modal-body')
					.find("input[type=text], input[type=password]").val("");
		$('#login-errors').addClass('invisible');
		$('#login-modal').modal('show');	
	});
	
	$('#login-form').on('submit', function (event) {
		event.preventDefault();
		
		var userInfo = $('#login-form').serializeJSON().user;
		var data = {remote: true, user: userInfo};
		$.ajax({
			url: '/users/sign_in.json', 
			type: "POST",
			data: data, 
			success: function (resp) {
				$('#login-modal').modal('hide');
				$('#user-email').removeClass('invisible').html($('#user_email').val());
				$('#log-in').addClass('invisible');
				$('#log-out').removeClass('invisible');
				$('#login-modal-body')
							.find("input[type=text], input[type=password]").val("");
				$('#login-errors').html('');
			},
			error: function (resp) {
				$('#login-errors').text(resp.responseJSON.errors)
				$('#login-errors').removeClass('invisible');
			}	
		});
	});
	
	$('#signup-form').on('submit', function (event) {
		event.preventDefault();
		
		var userInfo = $('#signup-form').serializeJSON().user;
		var data = {remote: true, user: userInfo};
		$.ajax({
			url: "/users.json", 
			type: "POST",
			data: data, 
			success: function (resp) {
				$('#login-modal').modal('hide');
				$('#user-email').removeClass('invisible').html($('#sign_user_email').val());
				$('#log-in').addClass('invisible');
				$('#log-out').removeClass('invisible');
				$('#login-modal-body')
							.find("input[type=text], input[type=password]").val("");
				$('#login-errors').html(' ');
			},
			error: function (resp) {
				$('#login-errors').text(resp.responseJSON.errors)
				$('#login-errors').removeClass('invisible');
			}	
		});
	});
	
	$('#google-sign-in').click(function (event) {
		$(this).append('<div class="progress progress-striped active"><div class="progress-bar"  id ="progress-bar" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 45%"></div></div>');
	});
 
	$('#song-search').typeahead([
		{
		 	// name: 'songs',
		  prefetch: {
				url: '/songs.json',
				ttl: 0
			},
		  header: '<h4>Songs</h4>'
		},
		{
		 	// name: 'artists',
		  prefetch: {
				url: '/songs/artists.json',
				ttl: 0
			},
		  header: '<h4>Artists</h4>'
		}	
	]);
	
	$('#add-song-button').on("click", function (event) {
		if (!($('#log-in').attr("class") == 'invisible' )) {
			event.preventDefault();
			$('#login-modal-body')
						.find("input[type=text], input[type=password]").val("");
			$('#login-errors').text('Adding a song requires log-in');
			$('#login-errors').removeClass('invisible');
			$('#login-modal').modal('show');
		}
	})
	
});
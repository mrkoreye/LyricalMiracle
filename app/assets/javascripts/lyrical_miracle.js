window.LyricalMiracle = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var div, songData, songs;
	
		// Need to go over this regarding cross site scripting
		div = $('<div><div>');
		div.html($('#bootstrapped-song').html());

		songData = JSON.parse(div.html());
		
		song = new LyricalMiracle.Models.Song(songData, {parse: true});
		
		var $rootEl = $("<div id='song-details'>");
		$('body').append($rootEl);
		
		new LyricalMiracle.Routers.SongsRouter($rootEl, song);
		Backbone.history.start();
  }
};


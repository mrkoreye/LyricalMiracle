window.LyricalMiracle = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var div, songData, songs;
	
		// Need to go over this regarding XSS
		div = $('<div><div>');
		div.html($('#bootstrapped-song').html());
		console.log(div);
		songData = JSON.parse(div.html());
		console.log("songData: " + songData);
		
		song = new LyricalMiracle.Models.Song(songData, {parse: true});
		
		var $rootEl = $("<div>");
		$('body').append($rootEl);
		
		new LyricalMiracle.Routers.SongsRouter($rootEl, song);
		Backbone.history.start();
  }
};

$(document).ready(function(){
  LyricalMiracle.initialize();
});

LyricalMiracle.Routers.SongsRouter = Backbone.Router.extend({
	initialize: function ($rootEl, model) {
		this.$rootEl = $rootEl;
		this.model = model;
	},
	
	routes: {
		"": "showSongDetails"
	},
	
	showSongDetails: function () {
		var view = new LyricalMiracle.Views.SongDetails({model: this.model});
		this.$rootEl.html(view.render().$el);
		view._initializeLinks();
	}
});

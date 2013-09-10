LyricalMiracle.Routers.SongsRouter = Backbone.Router.extend({
	initialize: function ($rootEl, model) {
		this.$rootEl = $rootEl;
		this.model = model;
	},
	
	routes: {
		"": "showSongDetails"
	},
	
	showSongDetails: function () {
		if (LyricalMiracle.Views.LastView) {
			LyricalMiracle.Views.LastView.remove();
		}
		var view = new LyricalMiracle.Views.SongDetails({model: this.model});
		LyricalMiracle.Views.LastView = view;
		this.$rootEl.html(view.render().$el);
		view._initializeLinks();
	}
});

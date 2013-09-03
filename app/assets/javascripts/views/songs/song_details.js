LyricalMiracle.Views.SongDetails = Backbone.View.extend({
	
  template: JST['songs/details'],
	
	render: function () {
		this.$el.html(this.template());
		return this;
	}

});

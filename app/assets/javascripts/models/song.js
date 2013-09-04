LyricalMiracle.Models.Song = Backbone.Model.extend({
	parse: function (data) {
		if(data.annotations == null) {
			var annotations = null;
		} else {
			var annotations = new LyricalMiracle.Collections.Annotations(data.annotations, {songId: data.id});
		}
		data.annotations = annotations;
		return data;
	},
	
	toJSON: function (options) {
		var json = _.clone(this.attributes);
		delete json.annotations;
		return json;
	},
	
	url: function () {
		return "/songs/" + this.id;
	}
});

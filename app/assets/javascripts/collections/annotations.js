LyricalMiracle.Collections.Annotations = Backbone.Collection.extend({
  model: LyricalMiracle.Models.Annotation,
	url: "/annotations",
	comparator: function (item) {
		return item.id;
	}
});

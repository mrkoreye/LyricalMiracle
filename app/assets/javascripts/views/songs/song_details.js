LyricalMiracle.Views.SongDetails = Backbone.View.extend({
	events: {
		"mouseup #song-lyrics": "addAnnotationButton",
		"mousedown #annotate-button": "showAnnotationForm",
		"mousedown #song-lyrics": "removeAnnotationButton",
		"mousedown #add-annotation-close": "removeAnnotationLink"
	},
	
  template: JST['songs/details'],
	
	render: function () {
		this.$el.html(this.template());
		return this;
	},
	
	addAnnotationButton: function () {
		var selection = window.getSelection();
		
		if (!selection.isCollapsed) {
			var parent_id = selection.anchorNode.parentNode.id;
			
			if (parent_id == "song-lyrics") {
				document.designMode = "on";
				document.execCommand("CreateLink", false, "/songs");
				var el = "<span id='annotate-button'>Annotate</span>"
				$(el).insertAfter('a[href$="/songs"]');
				document.execCommand("unlink", false)
				document.designMode = "off";
			}
		};
	},
	
	removeAnnotationButton: function () {
		$('#annotate-button').remove();
	},
	
	showAnnotationForm: function () {
		var currentSelection = window.getSelection().toString();
		
		document.designMode = "on";
		document.execCommand("CreateLink", false, "/annotations/unsaved-ann");
		document.designMode = "off";

		
		var annotations = this.model.get('annotations');
		annotations.create({}, {
			success: function () {
				annotations.sort();
				var annotation = annotations.last();
		
				$('a[href$="/annotations/unsaved-ann"]').attr("href", "annotations/" + annotation.id)
				
				$('#text-to-annotate').html("<blockquote><em>" + currentSelection + "</em></blockquote>");
				
			}
		});
		
		
		$('#my-modal').modal({
			backdrop: false
		});
	},
	
	removeAnnotationLink: function () {
		console.log("i am here");
		var annotationId = this.model.get('annotations').last.id;
		$('a[href$="/annotations/"' + annotationId + ']').contents().unwrap();
	}
	
	
	

});

LyricalMiracle.Views.SongDetails = Backbone.View.extend({
	events: {
		"mouseup #song-lyrics": "addAnnotationButton",
		"mousedown #annotate-button": "showAnnotationForm",
		"mousedown #song-lyrics": "removeAnnotationButton",
		"click #new-annotation-modal-close": "removeAnnotationLink",
		"submit #new-annotation": "submitNewAnnotation"
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
				$("#annotation_body").val('');
			}
		});
		
		$('#new-annotation-modal').modal({
			backdrop: false
		});
	},
	
	removeAnnotationLink: function () {
		$('#new-annotation-modal').modal('hide');
		var annotationId = this.model.get('annotations').last().id;
		var linkString = 'a[href="annotations/' + annotationId + '"]';
		$(linkString).contents().unwrap();
		this.model.get('annotations').last().destroy();	
	},
	
	submitNewAnnotation: function (event) {
		event.preventDefault();
		$('#new-annotation-modal').modal('hide')
	},
	
	submitNewAnnotation: function (event) {
		event.preventDefault();
		$('#new-annotation-modal').modal('hide');
		var songLyrics = $('#song-lyrics').html();
		var annotation = this.model.get('annotations').last();
		annotation.save({
			body: $("#annotation_body").val(),
			song_id: window.location.pathname.substring(7)
		})
		debugger
		this.model.save({body: songLyrics});	
		
		$('a[href="annotations/' + annotation.id + '"]').popover({
			content: "" + annotation.get("body"),
			// trigger: "hover",
			html: true
		});
		
		$('a').click(function (event) {
			event.preventDefault();
		});
	}

});

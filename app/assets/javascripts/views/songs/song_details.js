LyricalMiracle.Views.SongDetails = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model.get("annotations"), "change", this.render);
	},
	
	events: {
		"mouseup #song-lyrics": "addAnnotationButton",
		"mousedown #annotate-button": "showAnnotationForm",
		"mousedown .edit-annotation-link": "showEditAnnotationForm",
	},
	
  template: JST['songs/details'],
	
	render: function () {
		this.$el.html(this.template());
		this._initializeLinks();
		return this;
	},
	
	addAnnotationButton: function () {
		var selection = window.getSelection();
		
		if (!selection.isCollapsed) {
			var parent_id = selection.anchorNode.parentNode.id;
			var noAnnotationPresent = this._noAnnotationPresent(selection);
			
			if (parent_id == "song-lyrics" && noAnnotationPresent) {
				this._displayAnnotationButton();
			};
		};
	},
	
	showAnnotationForm: function () {
		var currentSelection = window.getSelection().toString();
		
		document.designMode = "on";
		document.execCommand("CreateLink", false, "unsaved-ann");
		document.designMode = "off";

		var newAnnView = new LyricalMiracle.Views.NewAnnotation({model: this.model});
		this.$el.append(newAnnView.render().$el);
		
		$('#new-annotation-modal').modal({
			backdrop: false
		});
	},
	
	showEditAnnotationForm: function () {
		var id = parseInt($(event.target).attr("id").substring(11));
		var annotation = this.model.get('annotations').findWhere({id: id});
		
		var editAnnotationView = new LyricalMiracle.Views.EditAnnotation({model: annotation});
		this.$el.append(editAnnotationView.render().$el);
		
		CKEDITOR.instances.annotation_body.setData(annotation.get('body'));
		var lyric = $('#popoverlink-' + id).text();
		$('#text-to-annotate').html("<blockquote><em>" 
									+ lyric + "</em></blockquote>");
		$('#edit-annotation-modal').modal({
			backdrop: false,
		});	
	},
	
	_noAnnotationPresent : function (selection) {
		var html;
		//taken from 
		//http://stackoverflow.com/questions/5643635/
		//how-to-get-selected-html-text-with-javascript
		if (selection.rangeCount) {
        var container = document.createElement("div");
        for (var i = 0, len = selection.rangeCount; i < len; ++i) {
            container.appendChild(selection.getRangeAt(i).cloneContents());
        }
        html = container.innerHTML;
    }
		if (html.indexOf("<a") == -1) {
			return true;
		} else {
			return false;
		}
	},
	
	_displayAnnotationButton: function () {
		document.designMode = "on";
		document.execCommand("CreateLink", false, "dummy-link");
		var el = "<span id='annotate-button'>Annotate</span>";
		$(el).insertAfter('a[href$="dummy-link"]');
		document.execCommand("unlink", false)
		document.designMode = "off";
	},
	
	_initializeLinks: function () {
		// $(this.$el).children().click( function (event) {
	// 		event.preventDefault();
	// 	});
		var that = this;
		//make loaded annotations work
		this.model.get("annotations").each(function (annotation) {

			that.$el.find('#popoverlink-' + annotation.id).popover({
				content: annotation.get("body"),
				html: true,
				title: "<a class='edit-annotation-link' id='annotation-" + annotation.id + "'>edit</a>"
			});
		});
	},
	
});

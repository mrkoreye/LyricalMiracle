LyricalMiracle.Views.SongDetails = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model.get("annotations"), "change", this.render);
	},
	
	events: {
		"mouseup #song-lyrics": "addAnnotationButton",
		"mousedown #annotate-button": "showNewAnnotationForm",
		"mousedown .edit-annotation-link": "showEditAnnotationForm",
		"click #edit-song-link": "requireLoginEdit"
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
	
	showNewAnnotationForm: function () {
		if (this._loggedIn()) {
			this._showNewAnnotationForm();
		} else {
			$('#login-modal-body')
						.find("input[type=text], input[type=password]").val("");
			$('#login-errors').text('Creating an annotation requires log-in');
			$('#login-errors').removeClass('invisible');
			$('#login-modal').modal('show');
		}
	},
	
	showEditAnnotationForm: function () {
		if (this._loggedIn()) {
			this._showEditAnnotationForm();
		} else {
			$('#login-modal-body')
						.find("input[type=text], input[type=password]").val("");
			$('#login-errors').text('Editing an annotation requires log-in');
			$('#login-errors').removeClass('invisible');
			$('#login-modal').modal('show');
		}
	},
	
	requireLoginEdit: function (event) {
		if (!this._loggedIn()) {
			event.preventDefault();
			$('#login-modal-body')
						.find("input[type=text], input[type=password]").val("");
			$('#login-errors').text('Editing a song requires log-in');
			$('#login-errors').removeClass('invisible');
			$('#login-modal').modal('show');
		}
	},
	
	_noAnnotationPresent : function (selection) {
		var html;
		//inspired by 
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
		var that = this;
		//make loaded annotations work
		var titleHtml =  "<a class='edit-annotation-link' id='annotation-";
		this.model.get("annotations").each(function (annotation) {
			that.$el.find('#popoverlink-' + annotation.id).popover({
				content: annotation.get("body"),
				html: true,
				title: titleHtml + annotation.id + "'>edit</a>"
			});
		});
	},
	
	_loggedIn: function () {
		if ($('#log-in').attr("class") == 'invisible' ) {
			return true;
		} else {
			return false;
		}
	},
	
	_showEditAnnotationForm: function () {
		var id = parseInt($(event.target).attr("id").substring(11));
		var annotation = this.model.get('annotations').findWhere({id: id});
		var editAnnotationView = new LyricalMiracle.Views.EditAnnotation({
			model: annotation
		});
		this.$el.append(editAnnotationView.render().$el);
	
		CKEDITOR.instances.annotation_body.setData(annotation.get('body'));
		var lyric = $('#popoverlink-' + id).text();
		$('#text-to-annotate').html("<blockquote><em>" 
									+ lyric + "</em></blockquote>");
		$('#edit-annotation-modal').modal({
			backdrop: false,
		});	
	},
	
	_showNewAnnotationForm: function () {
		var currentSelection = window.getSelection().toString();
	
		//creates pre-emptive link in song body in case selection changes
		document.designMode = "on";
		document.execCommand("CreateLink", false, "unsaved-ann");
		document.designMode = "off";

		var newAnnView = new LyricalMiracle.Views.NewAnnotation({
			model: this.model
		});
		this.$el.append(newAnnView.render().$el);
		this.listenTo(newAnnView, "change", this.render);
	
		$('#new-annotation-modal').modal({
			backdrop: false
		});
	}
	
});

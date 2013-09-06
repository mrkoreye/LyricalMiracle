LyricalMiracle.Views.SongDetails = Backbone.View.extend({
	
	events: {
		"mouseup #song-lyrics": "addAnnotationButton",
		"mousedown #annotate-button": "showAnnotationForm",
		"mousedown #song-lyrics": "removeAnnotationButtonPopover",
		"click #new-annotation-modal-close": "removeAnnotationLink",
		"submit #new-annotation": "submitNewAnnotation"
	},
	
  template: JST['songs/details'],
	
	render: function () {
		this.$el.html(this.template());

		CKEDITOR.replace(this.$el.find('#annotation_body').get(0), {"height":300,"stylesSet":[],"extraPlugins":"stylesheetparser,richfile,MediaEmbed,smiley","removePlugins":"scayt,menubutton,image,forms","contentsCss":"/assets/rich/editor.css","removeDialogTabs":"link:advanced;link:target","startupOutlineBlocks":false,"forcePasteAsPlainText":true,"format_tags":"h3;p;pre","toolbar": [['Bold','Italic','Underline','Subscript','Superscript'],[ 'NumberedList','BulletedList','Blockquote','-','JustifyLeft','JustifyCenter','JustifyRight', 'Smiley'],['Link', 'Unlink'], ['MediaEmbed','richImage']],"language":"en","richBrowserUrl":"/rich/files/","uiColor":"#f4f4f4","allowed_styles":["thumb","rich_thumb","original"],"default_style":"thumb","insert_many":false,"allow_document_uploads":false,"allow_embeds":true,"placeholder_image":"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==","preview_size":"100px","hidden_input":false});
		
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
	
	removeAnnotationButtonPopover: function () {
		// $('a').not(this).popover('hide');
	
		// $('.popover-link').not(this).popover('hide');
		// $('.popover-link').on('click', function (e) {
// 		    $('a').not(this).popover('hide');
// 		});
		$('#annotate-button').remove();
	},
	
	showAnnotationForm: function () {
		var currentSelection = window.getSelection().toString();
		
		document.designMode = "on";
		document.execCommand("CreateLink", false, "/unsaved-ann");
		document.designMode = "off";

		var annotations = this.model.get('annotations');
		var songId = window.location.pathname.substring(7)
		
		annotations.create({song_id: songId}, {
			success: function () {
				annotations.sort();
				var annotation = annotations.last();
		
				$('a[href$="/unsaved-ann"]').attr("href", "/" + annotation.id)
				
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
		var linkString = 'a[href="/' + annotationId + '"]';
		$(linkString).contents().unwrap();
		this.model.get('annotations').last().destroy();	
	},
	
	submitNewAnnotation: function (event) {
		event.preventDefault();
		var annotationForm = $(event.currentTarget).serializeJSON().annotation;
		$('#new-annotation-modal').modal('hide');
		var songLyrics = $('#song-lyrics').html();
		var annotations = this.model.get('annotations');

		annotations.last().save(annotationForm);
		
		var that = this;
		this.model.save({body: songLyrics}, {
			success: function () {
				//this seems a bit hacky. Better way to preserve annotation on save?
				that.model.attributes.annotations = annotations;
			}
		});	
		
		this._initializeLinks();
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
		document.execCommand("CreateLink", false, "/dummy-link");
		var el = "<span id='annotate-button'>Annotate</span>";
		$(el).insertAfter('a[href$="/dummy-link"]');
		document.execCommand("unlink", false)
		document.designMode = "off";
	},
	
	_initializeLinks: function () {
		$('#song-lyrics').children().click( function (event) {
			event.preventDefault();
		});
	
		//make loaded annotations work
		this.model.get("annotations").each(function (annotation) {
			$('a[href="/' + annotation.id + '"]').popover({
				content: "" + annotation.get("body"),
				html: true
			});
			$('a[href="/' + annotation.id + '"]').attr("class", "popover-link");
		});
	}

});

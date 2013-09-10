LyricalMiracle.Views.NewAnnotation = Backbone.View.extend({
	
	events: {
		"click #new-annotation-modal-close": "removeAnnotationLink",
		"submit #new-annotation": "submitNewAnnotation"
	},

  template: JST['annotations/new'],

	render: function () {
		this.$el.html(this.template());
		this._insertRichTextEditor();
		var currentSelection = window.getSelection().toString();
		this.$el.find('#text-to-annotate').html("<blockquote><em>" 
									+ currentSelection + "</em></blockquote>");
		return this;
	},
	
	removeAnnotationLink: function () {
		$('#new-annotation-modal').modal('hide');
		$('a[href$="unsaved-ann"]').contents().unwrap();
		this.remove();
	},
	
	submitNewAnnotation: function (event) {
		event.preventDefault();
		$('#new-annotation-modal').modal('hide');
		
		var that = this;
		var annotations = this.model.get('annotations');
		var annotationForm = $(event.currentTarget).serializeJSON().annotation;
		
		this.model.get("annotations").create(annotationForm, {
			wait: true,
			success: function (model) {
				$('a[href$="unsaved-ann"]')
					.attr("href", '#')
					.attr("id", "popoverlink-" + model.id)
					.attr("class", "popover-link")
					.popover({
						content: model.get("body"),
						html: true,
						title: "<a class='edit-annotation-link' id='annotation-" + model.id + "'>edit</a>"
					});
			
				var songLyrics = $('#song-lyrics').html();
				that.model.save({body: songLyrics}, {
					success: function () {
						//this seems a bit hacky. Better way to preserve annotation on save?
						that.model.attributes.annotations = annotations;			
						that.remove();
					}
				});
			}
		});
		

	},
	
	_insertRichTextEditor: function () {
		//these are the settings to manually swap the textare with the text editor
		CKEDITOR.replace(this.$el.find('#annotation_body').get(0), {"height":300,"stylesSet":[],"extraPlugins":"stylesheetparser,richfile,MediaEmbed,smiley","removePlugins":"scayt,menubutton,image,forms,elementspath,magicline","contentsCss":"/assets/rich/editor.css","removeDialogTabs":"link:advanced;link:target","startupOutlineBlocks":false,"forcePasteAsPlainText":true,"format_tags":"h3;p;pre","toolbar": [['Bold','Italic','Underline','Subscript','Superscript'],[ 'NumberedList','BulletedList','Blockquote','-','JustifyLeft','JustifyCenter','JustifyRight', 'Smiley'],['Link', 'Unlink'], ['MediaEmbed','richImage']],"language":"en","richBrowserUrl":"/rich/files/","uiColor":"#f4f4f4","allowed_styles":["thumb","rich_thumb","original"],"default_style":"thumb","insert_many":false,"allow_document_uploads":false,"allow_embeds":true,"placeholder_image":"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==","preview_size":"100px","hidden_input":false});
	}
});

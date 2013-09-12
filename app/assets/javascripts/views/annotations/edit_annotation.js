LyricalMiracle.Views.EditAnnotation = Backbone.View.extend({
	
	events: {
		"submit #edit-annotation": "submitEditAnnotation"
	},

  template: JST['annotations/edit'],

	render: function () {
		this.$el.html(this.template());
		this._insertRichTextEditor();
		return this;
	},
	
	submitEditAnnotation: function (event) {
		event.preventDefault();
		var annotationForm = $(event.currentTarget).serializeJSON().annotation;
		var replaced = annotationForm.body.replace(/\s+|<\/p>|<p>|&nbsp;/, '')
		
		if (replaced == '') {
			$('#annotation-blank-error').html('<div class="alert alert-warning">Annotation cannot be blank</div>');
		} else {
			$('#edit-annotation-modal').modal('hide');
			this.model.save(annotationForm);
			this.remove();
		}
	},
	
	_insertRichTextEditor: function () {
		//seems to be necessary for proper behavior of multiple editors
		// for(name in CKEDITOR.instances) {
	// 	    CKEDITOR.instances[name].destroy()
	// 	}
		//these are the settings to manually swap the textare with the text editor
		CKEDITOR.replace(this.$el.find('#annotation_body').get(0), {"height":300,"stylesSet":[],"extraPlugins":"stylesheetparser,richfile,MediaEmbed,smiley","removePlugins":"scayt,menubutton,image,forms,elementspath,magicline","contentsCss":"/assets/rich/editor.css","removeDialogTabs":"link:advanced;link:target","startupOutlineBlocks":false,"forcePasteAsPlainText":true,"format_tags":"h3;p;pre","toolbar": [['Bold','Italic','Underline','Subscript','Superscript'],[ 'NumberedList','BulletedList','Blockquote','-','JustifyLeft','JustifyCenter','JustifyRight', 'Smiley'],['Link', 'Unlink'], ['MediaEmbed','richImage']],"language":"en","richBrowserUrl":"/rich/files/","uiColor":"#f4f4f4","allowed_styles":["thumb","rich_thumb","original"],"default_style":"thumb","insert_many":false,"allow_document_uploads":false,"allow_embeds":true,"placeholder_image":"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==","preview_size":"100px","hidden_input":false});
	}
});

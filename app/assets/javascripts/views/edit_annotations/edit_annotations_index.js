LyricalMiracle.Views.EditAnnotationsIndex = Backbone.View.extend({
	
	events: {
		"submit #new-annotation": "submitEditAnnotation"
	},

  template: JST['edit_annotations/index'],

	render: function () {
		this.$el.html(this.template());
		this._insertRichTextEditor();
		debugger
		return this;
	},
	
	removeAnnotationLink: function () {
		$('#new-annotation-modal').modal('hide');
		var annotationId = this.model.get('annotations').last().id;
		var linkString = 'a[href="' + annotationId + '"]';
		$(linkString).contents().unwrap();
		this.model.get('annotations').last().destroy();	
	},
	
	_insertRichTextEditor: function () {
		if (CKEDITOR.instances.annotation_body) {
			CKEDITOR.instances.annotation_body.destroy();
		} 
		debugger
		//these are the settings to manually swap the textare with the text editor
		CKEDITOR.replace(this.$el.find('#annotation_body').get(0), {"height":300,"stylesSet":[],"extraPlugins":"stylesheetparser,richfile,MediaEmbed,smiley","removePlugins":"scayt,menubutton,image,forms,elementspath,magicline","contentsCss":"/assets/rich/editor.css","removeDialogTabs":"link:advanced;link:target","startupOutlineBlocks":false,"forcePasteAsPlainText":true,"format_tags":"h3;p;pre","toolbar": [['Bold','Italic','Underline','Subscript','Superscript'],[ 'NumberedList','BulletedList','Blockquote','-','JustifyLeft','JustifyCenter','JustifyRight', 'Smiley'],['Link', 'Unlink'], ['MediaEmbed','richImage']],"language":"en","richBrowserUrl":"/rich/files/","uiColor":"#f4f4f4","allowed_styles":["thumb","rich_thumb","original"],"default_style":"thumb","insert_many":false,"allow_document_uploads":false,"allow_embeds":true,"placeholder_image":"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==","preview_size":"100px","hidden_input":false});
	}
});

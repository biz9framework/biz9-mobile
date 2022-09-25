//9_note_init
let editor={};
function init_item_note(_str){
	editor = new FroalaEditor('div#div_note',
        {
            imageUploadURL: '/cloud/file/update_photo',
            imageUploadMethod: 'POST',
            imageMaxSize: 5 * 1024 * 1024,
            imageAllowedTypes: ['jpeg', 'jpg', 'png'],
            events: {
      'image.uploaded': function (response) {
          response= JSON.parse(response);
          editor.image.insert(response.helper.item.album_photo_url, false);
      }}
        }, function () {
		editor.html.set(_str);
	});
    return editor;
}

function get_item_note(){
 return editor.html.get();
}



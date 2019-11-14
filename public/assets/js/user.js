$('#userForm').on('submit', function() {
    var userData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: userData,
        success: function() {
            location.reload();
        },
        error: function() {
            alert('添加失败');
        }
    });
    return false;
});
  $('#modifyBox').on('change', '#avatar', function() {
      var formData = new FormData();
      formData.append('avatar', this.files[0]);
      $.ajax({
          type: 'post',
          url: '/upload',
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
              //返回的是地址
              $('#preview').attr('src', response[0].avatar);
              $('#hiddenAvatar').val(response[0].avatar);
          }
      });
  });
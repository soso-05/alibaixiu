//上传表达内容到数据库中
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
//上传图片文件
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
$.ajax({
    type: 'get',
    url: '/users',
    success: function (response) {
     var html = template('userTpl', { data:response})
     $('#userBox').html(html)
    }
})

$('#userBox').on('click','.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: `/users/${id}`,
        success: function(response) {
            //console.log(response)
            var html = template('modifyTpl',response)
            $('#modifyBox').html(html)
        }
    });
});
$('#modifyBox').on('submit','#modifyForm',function(){
    let formData=$(this).serialize();
    let id=$(this).attr('data-id')
    $.ajax({
        type:'put',
        url:`/users/${id}`,
        data:formData,
        success:function(){
            location.reload();
        }
    })
    return false
})
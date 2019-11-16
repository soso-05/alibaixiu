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
//编辑修改后上传给右边啊数据
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
//编辑修改图片
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
//添加删除功能
$('#userBox').on('click', '.delete', function() {
    if (confirm('确定删除码?')) {
        let id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: `/users/${id}`,
            success: function() {
                location.reload();
            }
        });
    }
});
//全选input框.显示按钮
var selectAll = $('#selectAll');
selectAll.on('change', function() {
    let status = $(this).prop('checked');
    $('#userBox')
        .find('input')
        .prop('checked', status);
    if (status) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});
//点击单个或多个input 显示批量删除按钮
$('#userBox').on('change', '.userStatus', function() {
    var inputs = $('#userBox').find('input');
    if (inputs.length == inputs.filter(':checked').length) {
        selectAll.prop('checked', true);
    } else {
        selectAll.prop('checked', false);
    }
    if (inputs.filter(':checked').length > 0) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});
//批量删除
$('#deleteMany').on('click', function() {
    var ids = [];
    var checkedUser = $('#userBox')
        .find('input')
        .filter(':checked');
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'));
    });
    if (confirm('确定批量删除?')) {
        $.ajax({
            type: 'delete',
            url: `/users/${ids.join('-')}`,
            success: function() {
                location.reload();
            }
        });
    }
});
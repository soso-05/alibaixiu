$('#addCategory').on('submit', function() {
   //    alert('111')
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload();
        }
    });
    return false;
});
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        var html = template('categoryListTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    }
});
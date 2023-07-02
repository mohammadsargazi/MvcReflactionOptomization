function post(controller, action, data, callBackFun) {
    $.ajax({
        url: '/' + controller + '/' + action,
        type: 'Post',
        dataType: 'json',
        beforeSend: function () {
            loadingBoxStart();
        },
        data: JSON.stringify(data),
        success: function (item) {
            callBackFun(item);
        },
        complete: function () {
            loadingBoxStop();
        },
    });
}
function postAndRedirect(controller, action, data,returnUrl) {
    $.ajax({
        url: '/' + controller + '/' + action,
        type: 'Post',
        dataType: 'json',
        beforeSend: function () {
            loadingBoxStart();
        },
        data: JSON.stringify(data),
        success: function (item) {
            if (!item.res) {
                $.growl.error({ message: data.message });
            }
            else {
                location.href = returnUrl;
            }
        },
        complete: function () {
            loadingBoxStop();
        },
    });
}

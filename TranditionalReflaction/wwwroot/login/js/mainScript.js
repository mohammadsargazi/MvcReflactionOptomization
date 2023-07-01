$(document).ready(function() {
    //Validation Submit
    $("#btn-login").click(function() {
        // remove comments
        $('small').remove()
        $("input").css('border', 'none');
        $("input").css('border-bottom', '1px solid #777777');
        // variables
        var name = $("#user-name").val();
        var pass = $("#user-pass").val();
        // validation inputs
        if (name == "" || name == " ") {
            $('#user-name').css('border', '1px solid red');
            $("#user-name").after("<small class='mx-2 mb-2 text-danger d-block float-right'> نام کاربری خود را وارد کنید</small>");
            return false
        } else {
            // remove comments
            $('small').remove();
            $('#user-name').css('border', 'none');
            $('#user-name').css('border-bottom', '2px solid green');
        }
        if (pass == "" || pass == " ") {
            $('#user-pass').css('border', '1px solid red');
            $("#user-pass").after("<small class='mx-2 mb-2 text-danger d-block float-right'>پسورد خود را وارد کنید</small>");
            return false
        } else {
            // remove comments
            $('small').remove();
            $('#user-pass').css('border', 'none');
            $('#user-pass').css('border-bottom', '2px solid green');
        }
    });
});
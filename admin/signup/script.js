const ADMINSIGNUP_API = "../../api/adminsignup.php";


function save() {
    let signUpForms = {
        
        complete_name : $("#complete_name").val(),
        username : $("#username").val(),
        password : $("#password").val(),
        confirm_password :  $("#confirm_password").val()
    };

    $.ajax({
        "url" : ADMINSIGNUP_API ,
        "type" : "POST",
        "data" : "store=" + JSON.stringify(signUpForms),
        "success" : function(response) {
            
            let responseJSON = JSON.parse(response)

            alert(responseJSON.description);

            if (responseJSON.code == 200)
            {
                window.location.href= "../login"
            }
            
            return false;
        }
    })

    return false;
}
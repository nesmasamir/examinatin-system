
var email = document.getElementById("user-mail");
var mailSpan = document.getElementById("mail-span");
var password = document.getElementById("user-pass");
var passSpan = document.getElementById("pass-span");
var form = document.getElementById("form");
var errorMsg = document.getElementById("errorMsg")
var mailKey;
var indx;

var res = getCookie("regestired")
if (res == "true") {
    var counter = Number(getCookie("counter")) - 1
   
    email.value = getCookie(`email${counter}`);
}

function emailValidation(mailInp, span) {
    span.style.display = "block"
    var regMail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (mailInp.value === "") {
        span.innerHTML = "*required";
    }

    else if (!regMail.test(mailInp.value)) {
        span.innerHTML = "invalid mail";

    }
    else {

        if (typeof (span) != undefined && span != null) {
            span.style.display = "none"
            return true;
        }
        return false;
    }


}

function passVlidation(passInp, span) {
    span.style.display = "block"
    if (passInp.value === "") {
        span.innerHTML = "*required";

    }
    else if (password.value.length < 3) {

        span.innerHTML = "please enter 8 character or more!! "

    }
    else {

        if (typeof (span) != undefined && span != null) {
            span.style.display = "none";
            return true;
        }
        return false;
    }
}

email.addEventListener("blur", function () {
    emailValidation(email, mailSpan)

})
password.addEventListener("blur", function () {

    passVlidation(password, passSpan)

})


form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (emailValidation(email, mailSpan) && passVlidation(password, passSpan)) {

        errorMsg.innerHTML = "";
        if (hasCookieVal(email.value)[1]) {
            mailKey = hasCookieVal(email.value)[0].split("");
            indx = mailKey[mailKey.length - 1]

            if ((getCookie(`password${indx}`) == password.value)) {

                location.replace("exam.html");
                setcookie("activeUser", indx, new Date("1/1/2023"))

            }
           
            else {
                errorMsg.innerHTML = "eamil or password  is not correct";
    
            }
        }
        else {
            errorMsg.innerHTML = "eamil or password  is not correct";

        }
        
        
    }




})
//validation

(function formValidation() {
    var userFname = document.getElementById("user-fname");
    var userLname = document.getElementById("user-lname");
    var email = document.getElementById("user-mail");
    var password = document.getElementById("user-pass");
    var confirmPass = document.getElementById("confirm-pass");
    var form = document.getElementById("form");
    var fnSpan = document.getElementById("fn-span");
    var lnSpan = document.getElementById("ln-span");
    var mailSpan = document.getElementById("mail-span");
    var passSpan = document.getElementById("pass-span");
    var confpassSpan = document.getElementById("confpass-span");
    var errorMsg = document.getElementById("errorMsg")
    var flag = false;


    function userNameValidation(inp, span) {
        span.style.display = "block"
        var alphaExp = /^[a-zA-Z]+$/;
        if (inp.value === "") {

            span.innerHTML = "*required";

        }
        else if (!alphaExp.test(inp.value)) {
            span.innerHTML = "enter only character";
        }

        else {

            if (typeof (span) != undefined && span != null) {
                span.style.display = "none";
                return true;
            }

        }
        return false
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
                return true
            }
        }
        return false;


    }

    function passVlidation(passInp, span) {

        span.style.display = "block"
        if (passInp.value === "") {
            span.innerHTML = "*required";
        }
        else if (password.value.length < 8) {
            span.innerHTML = "please enter 8 character or more!! "

        }
        else {

            if (typeof (span) != undefined && span != null) {
                span.style.display = "none";
                return true
            }
        }
        return false
    }

    function confirmPasssValid(password, confirmPass, span) {
        span.style.display = "block"
        if (confirmPass.value === "") {
            span.innerHTML = "*required";
        }
        else if (password.value === "" && isFinite(confirmPass.value)) {

            span.innerHTML = "enter password first! ";
        }

        else if (password.value !== confirmPass.value) {

            span.innerHTML = "password doesn't match!! ";
        }
        else {

            if (typeof (span) != undefined && span != null) {
                span.style.display = "none"
                return true;
            }

        }
        return false;
    }

    (function validation() {

        userFname.addEventListener("blur", function () {
            userNameValidation(userFname, fnSpan);
        })

        userLname.addEventListener("blur", function () {

            userNameValidation(userLname, lnSpan);
        })
        email.addEventListener("blur", function () {

            emailValidation(email, mailSpan);
        })
        password.addEventListener("blur", function () {

            passVlidation(password, passSpan);
        })
        confirmPass.addEventListener("blur", function () {

            confirmPasssValid(password, confirmPass, confpassSpan);
        })

    })()
    // validation()



    function formValidation(fnamINp, lnameInp, mailInp, passInp,
        confirmPassInp, fnSpan, lnSpan, mailSpan, passSpan, confpassSpan) {

        if (
            !userNameValidation(fnamINp, fnSpan) &&


            !userNameValidation(lnameInp, lnSpan) &&


            !emailValidation(mailInp, mailSpan) &&


            !passVlidation(passInp, passSpan) &&

            !confirmPasssValid(passInp, confirmPassInp, confpassSpan)) {
            return false;
        }
        else if (userNameValidation(fnamINp, fnSpan) &&


            userNameValidation(lnameInp, lnSpan) &&


            emailValidation(mailInp, mailSpan) &&


            passVlidation(passInp, passSpan) &&

            confirmPasssValid(passInp, confirmPassInp, confpassSpan)) {

            return true
        }

    }




    var counter = Number(getCookie("counter"));

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (formValidation(userFname, userLname, email, password, confirmPass, fnSpan, lnSpan, mailSpan, passSpan, confpassSpan)) {

            if (!hasCookieVal(email.value)[1]) {

                location.replace('login.html');
                setcookie(`userFname${counter}`, userFname.value, new Date("1/1/2023"));
                setcookie(`userLname${counter}`, userLname.value, new Date("1/1/2023"));
                setcookie(`email${counter}`, email.value, new Date("1/1/2023"));
                setcookie(`password${counter}`, password.value, new Date("1/1/2023"));
                setcookie(`counter`, Number(counter) + 1, new Date("1/1/2023"));
                setcookie(`regestired`, "true", new Date("1/1/2023"));

            }
            else {

                errorMsg.innerHTML = `You already Have An Accouunt, <a href="login.html">login</a>`
                userFname.value = "";
                userLname.value = "";
                email.value = "";
                password.value = "";
                confirmPass.value = "";
                setcookie(`regestired`, "false", new Date("1/1/2023"));


            }

        }

    })
})()





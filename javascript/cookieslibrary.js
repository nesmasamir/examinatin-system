
var allCookies = [];
function splitCookies() {
    var cookiesData = document.cookie;
    var keyvalCookie = cookiesData.split(";").join("").split(" ");
    for (var i = 0; i < keyvalCookie.length; i++) {
        allCookies.push(keyvalCookie[i].split("="))
    }
}
splitCookies();



function setcookie(cookieName, cookieValue, expireDate) {
    document.cookie = cookieName + "=" + cookieValue + ";" + "expires=+" + expireDate;
}



function getCookie(cookieKey) {
    var cookieVal;
    allCookies.forEach(function (cok) {
        if (cok[0] === cookieKey) {
            cookieVal = cok[1];
        }
    })
    return cookieVal;

}



function hasCookie(cookieKey) {
    var flag = false;

    allCookies.forEach(function (el) {
        if (el[0] === cookieKey) {
            flag = true;
        }

    })
    return flag
}



function deleteCookie(cookieKey) {
    var expiredate = new Date("1/1/2000")
    
    var checkCookie = hasCookie(cookieKey);
    if (checkCookie) {
        document.cookie = cookieKey + "= ;" + "expires=+" + expiredate;
        console.log(`${cookieKey} deleted successfully`);
        
    }
    else {
        console.log(`${cookieKey}  not found`);
        
    }

}


function hasCookieVal(cookieVal) {
    var flag = [false,false];
    
    allCookies.forEach(function (el) {
        if (el[1] == cookieVal) {
            flag = [el[0],true];
        }
        
    })
    return flag
}



// function showAllCookies() {
//     allCookies.forEach(function (el) {
//         console.log(el[0], el[1]);
//     })

// }
// showAllCookies()

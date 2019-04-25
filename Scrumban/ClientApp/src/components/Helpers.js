
const updateTokenRefresh = "/api/Users/updateToken";

export function checkToken() {

    var jwtDecode = require('jwt-decode');
    var current_time = new Date().getTime() / 1000
    var expire_time = jwtDecode(sessionStorage.getItem("tokenKey")).exp

    if (current_time > expire_time) {
        var refreshTokenData = JSON.stringify({
            "userId": sessionStorage.getItem("userId"),
            "token": sessionStorage.getItem("refreshTokenKey")
        });
        fetch(updateTokenRefresh, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: refreshTokenData
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json()
                }
                else {
                    alert("ERROR! Status code: " + response.status + "\nAuthentication failed.:-(")
                    return "error"
                }
            })
            .then(data => {
                if (data == "error") {
                    window.location.replace("/login");
                }
                else {
                    sessionStorage.setItem("tokenKey", data.access_token)
                    sessionStorage.setItem("refreshTokenKey", data.refresh_token)
                    sessionStorage.setItem("expires", data.expires)
                    var userId = data.user.id
                    sessionStorage.setItem("userId", userId)
                }

            })
    }
}
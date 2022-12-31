
var toggle_btn = document.getElementById("btn");
var loginbox = document.getElementsByClassName('loginbox');

function displayRegister() 
{
    'use strict';
    
    toggle_btn.style.left = "0";
    
    var register = "<form onsubmit='return false'> <p>Username</p> <input type = 'text' id='username' placeholder='Enter New Username'/><p>Password</p><input type = 'password' id='password' placeholder='Enter New Password'/><p>Confirm Password</p> <input type = 'password' id='confirm-password' placeholder='Confirm New Password'/><br><input type = 'submit' id='register-btn' value = 'Register' onclick='register()'/></form>";
    
    document.getElementById("register_login_box").innerHTML = register;
    loginbox[0].style.height = "430px";
}

function displayLogin() {
    'use strict';
    
    toggle_btn.style.left = "125px";
    
    var login = "<form method='post' onsubmit='return false'> <p>Username </p> <input type = 'text' id='username' placeholder='Enter Username'/> <p>Password </p> <input type = 'password' id='password' placeholder='Enter Password'/> <br> <input type = 'submit' id='login-btn' value = 'Login' onclick='login()'/> </form>";
    
    document.getElementById("register_login_box").innerHTML = login;
    loginbox[0].style.height = "350px";
}

function register() {
    'use strict';
    
    
    var username = document.getElementById('username').value.toString();
    var password = document.getElementById('password').value.toString();
    var confirm_password = document.getElementById('confirm-password').value.toString();


    if(username=="" || password=="" ||confirm_password=="") {
        window.alert("please fill the missing fields first");
        document.getElementById('password').value = "";
        document.getElementById('confirm-password').value = "";
    }
    
    else {
        if(username.length<4) {
            window.alert("username must be at least 4 characters long");
            document.getElementById('username').value = "";
            document.getElementById('password').value = "";
            document.getElementById('confirm-password').value = "";
        }
        
        else if(password.length<8) {
            window.alert("password must be at least 8 characters long!");
            document.getElementById('password').value = "";
            document.getElementById('confirm-password').value = "";
        }
        
        else if(password.length>15) {
            window.alert("password must be at most 15 characters long!");
            document.getElementById('password').value = "";
            document.getElementById('confirm-password').value = "";
        }
        
        else if(password!=confirm_password) {
            window.alert("passwords are not the same");
            document.getElementById('password').value = "";
            document.getElementById('confirm-password').value = "";
        }
        else {
            $.post({
                url:'../database/register',
                data: {'username':username, 'password':password},
                datatype: 'json',
                success: function(data)
                {
                    if(data.exist)
                        window.alert('username already exists')
        
                    else
                    {
                        window.alert('account successfully created!')
                        sessionStorage.setItem('logged_in', true);
                        window.location.href = "../homepage";
                    }
                }
            });  
        }
    }
}

function login() {
    'use strict';
    
    var username = document.getElementById('username').value.toString();
    var password = document.getElementById('password').value.toString();
    
    if(username=="" || password=="") {
        window.alert("please fill the missing fields first");
        document.getElementById('password').value = "";
    }
    else 
    {
        $.post({
            url: '../database/login',
            data: {'username': username, 'password': password},
            datatype: 'JSON',
            success: function(data)
            {
                if(data.exist)
                {
                    window.alert('login successful!');
                    sessionStorage.setItem('logged_in', true);
                    window.location.href = "../homepage";
                }
                else
                {
                    window.alert('wrong username or password');
                    document.getElementById('password').value = "";
                }

            }
        });
    }
}

function allow_access()
{
    'use strict';
    
    var isLoggedIn = sessionStorage.getItem('logged_in');
    if(!isLoggedIn)
    {
        window.alert("please login or register first!");
        return false;
    }
    else
        return true;
}

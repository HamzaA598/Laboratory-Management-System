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

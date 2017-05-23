"use strict";
angular.module("auth.services", [])
.factory("authService", function($http, apiEndPoint, $q){
    //var storage = window.sessionStorage;
    var storage = window.localStorage;
    //if token present, user authenticated
    return {
        isAuthenticated : function() {
            return storage.token ? true:false;
        },

        getToken : function() {
            return storage.token;
        },

        setToken: function(token) {
            storage.setItem("token", token);
            console.log("token set ", token);
        },

        setTokenExpiry:function(expires) {
            storage.setItem("tokenExpiry",  expires);
        },

        setIdentity : function(identity) {
            storage.setItem("identity", JSON.stringify(identity));
        },

        getIdentity: function() {
            var identity = storage.getItem("identity");

            return identity ? JSON.parse(identity) : null;
        },

        hasRole: function(name) {
            var identity = this.getIdentity();
            //console.log("hasRole ", name, identity);

            if (!identity)
                return false;

            if (identity.role === name) {
                return true;
            }

            return false;
        },

        login: function(username, password) {
            var self = this;

            var data = {
                    'username': username,
                    'password': password
            }
            
             return $http.post(apiEndPoint + "/authenticate",  data)
                .then(function(response){
                    console.log("login done ", response.data);
                    self.setToken(response.data.token);
                    self.setTokenExpiry(response.data.expires);
                    
                    self.setIdentity(response.data.user);

                    return response; 
                    //$rootScope.$broadcast("LoggedIn", "User LoggedIn");

                    //$state.go("home");
                }, function(error){
                    return $q.reject("loginError");
                })
        },

        logout: function() {
            storage.removeItem("token");
            storage.removeItem("identity");
            storage.removeItem("tokenExpiry");

            //TODO: You may clean all the user specific sessions, localStorage here
        }
    }
})
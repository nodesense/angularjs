angular.module('app.exceptions', []).
  factory('$exceptionHandler',  function($log) {
    console.log("called wiht factory");
    return function appExceptionHandler(exception, cause) {
      console.warn("Error in angular app ", exception);
      //$log.warn(exception, cause);
      console.log("cause ", cause);
    };
});
angular.module('voiceMessagesApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
            .when('/:message', {
              templateUrl: 'index.html',
              controller: 'VoiceMessagesController'
            }).otherwise( {
              redirectTo: '/'
            });
  })
  .controller('VoiceMessagesController', function($scope, $routeParams) {
    $scope.message = $routeParams.message;
    console.log($routeParams);
    $scope.link = "https://github.com";

    // CryptoJS.AES.encrypt("Message", "Secret Passphrase")
    // CryptoJS.AES.decrypt(encrypted, "Secret Passphrase")
  });

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
  .controller('VoiceMessagesController', function($scope, $routeParams, $location) {
    var baseUrl = $location.protocol() + '://' + $location.host()
                  + ':' + $location.port() + '/#!/';
    console.log(baseUrl);
    $scope.message = ''
    $scope.link = "https://github.com";
    $scope.$on('$routeChangeSuccess', function() {
      if ($routeParams.message) {
        var message = $routeParams.message;
        notify(message);
      }
    });

    $scope.getLink = function () {
      $scope.link = baseUrl + $scope.message;
    };

    function notify(message) {
      var voices = speechSynthesis.getVoices();
      var utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = voices[0];
      speechSynthesis.speak(utterance);
    }

    // CryptoJS.AES.encrypt("Message", "Secret Passphrase")
    // CryptoJS.AES.decrypt(encrypted, "Secret Passphrase")
  });

angular.module('voiceMessagesApp', ['ngRoute', 'ngClipboard'])
  .config(function ($routeProvider) {
    $routeProvider
            .when('/:message', {
              templateUrl: 'index.html',
              controller: 'VoiceMessagesController'
            }).otherwise( {
              redirectTo: '/'
            });
  })
  .controller('VoiceMessagesController', function($scope, $routeParams, $location, ngClipboard) {
    var key = 3;
    var baseUrl = $location.absUrl().split('#!')[0] + '#!/';
    var recievedMessage = '';

    $scope.message = "";
    $scope.link = "Your link will be here!";
    $scope.sendMode = true;

    $scope.$on('$routeChangeSuccess', function() {
      if ($routeParams.message) {
        recievedMessage = caesarShift($routeParams.message, -key);
        if (recievedMessage !== '') {
          $scope.sendMode = false;
        }
        $scope.notify(recievedMessage);
      }
    });

    $scope.getLink = function () {
      var encryptedMessage = caesarShift($scope.message, key);
      encryptedMessage = encryptedMessage.replace(/ /g, '%20');
      $scope.link = baseUrl + encryptedMessage;
    };

    $scope.notify = function (message) {
      var voices = speechSynthesis.getVoices();
      var utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = voices[0];
      speechSynthesis.speak(utterance);
    };

    $scope.copyToClipboard = function () {
      ngClipboard.toClipboard($scope.link);
    };

    $scope.replay = function () {
      $scope.notify(recievedMessage);
    };

    $scope.send = function () {
      $scope.sendMode = true;
    }

    function caesarShift(str, amount) {
    	var output = '';
      for (var i = 0; i < str.length; i++) {
        char = str[i].charCodeAt();
        if(char === 32) {
          output += ' ';
          continue;
        }
        charcode = char + amount;
        output += String.fromCharCode(charcode);
      }
    	return output;
    }
  });

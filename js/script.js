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
      encryptedMessage = encryptedMessage.replace(' ', '%20');
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
    	if (amount < 0)
    		return caesarShift(str, amount + 26);
    	var output = '';
    	for (var i = 0; i < str.length; i ++) {
    		var c = str[i];
    		if (c.match(/[a-z]/i)) {
    			var code = str.charCodeAt(i);
    			if ((code >= 65) && (code <= 90))
    				c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
    			else if ((code >= 97) && (code <= 122))
    				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
    		}
    		output += c;
    	}
    	return output;
    };
  });

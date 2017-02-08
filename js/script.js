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
    var key = 3;
    var baseUrl = $location.absUrl().split('#!')[0] + '#!/';

    $scope.message = "";
    $scope.link = "https://github.com";

    $scope.$on('$routeChangeSuccess', function() {
      if ($routeParams.message) {
        var encryptedMessage = $routeParams.message;
        var decryptedMessage = caesarShift(encryptedMessage, -key);
        notify(decryptedMessage);
      }
    });

    $scope.getLink = function () {
      var encryptedMessage = caesarShift($scope.message, key);
      $scope.link = baseUrl + encryptedMessage;
    };

    function notify(message) {
      var voices = speechSynthesis.getVoices();
      var utterance = new SpeechSynthesisUtterance(message);
      utterance.voice = voices[0];
      speechSynthesis.speak(utterance);
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

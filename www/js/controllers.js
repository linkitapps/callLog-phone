angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPlatform, CallLogService) {
  $ionicPlatform.ready(function() {
    $scope.data = {};
    $scope.callTypeDisplay = function(type) {
      switch(type) {
        case 1:
          return 'Incoming';
        case 2:
          return 'Outgoing';
        case 3:
          return 'Missed';
        default:
          return 'Unknown';
      }
    };

    CallLogService.list(7).then(
      function(callLog) {
        console.log(callLog);
        $scope.data.lastCall = callLog[0];
        $scope.data.callLog = callLog;
      },
      function(error) {
        console.error(error);
      });

    // https://github.com/renanoliveira/cordova-phone-call-trap
    // http://blog.naver.com/jihwan0724/220352626225
    // call state 가 IDLE 이 아닌 것이었다가 IDLE 로 바뀔 때 callLog 저장
    // 원격 앱에서는 폰의 callLog 를 바로 읽는 것이 아니라 폰의 앱에 저장된 callLog 를 읽음
    // 폰 사용자가 callLog 를 삭제해도 원격 앱에서는 모든 callLog 를 볼 수 있게 하기 위해
  });
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

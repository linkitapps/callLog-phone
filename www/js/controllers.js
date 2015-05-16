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
    // call state �� IDLE �� �ƴ� ���̾��ٰ� IDLE �� �ٲ� �� callLog ����
    // ���� �ۿ����� ���� callLog �� �ٷ� �д� ���� �ƴ϶� ���� �ۿ� ����� callLog �� ����
    // �� ����ڰ� callLog �� �����ص� ���� �ۿ����� ��� callLog �� �� �� �ְ� �ϱ� ����
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

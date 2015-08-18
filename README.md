# Angular-IO

A concise, reliable and powerful library to make use of [Socket.io](http://socket.io/) in [Angular.js](https://angularjs.org/).

Providing the capability for just writing declarative code benefit from Angular Directive.


```html
<html ng-app="myApp">
  <head></head>
  <body ng-controller="myController">
    <div>
      {{ status }}
      <ul io io-message="messages.push($data)">
        <li ng-repeat="message in messages track by $index">
          {{ message }}
        </li>
      </ul>
      <input type="text" ng-model="myMessage"/>
      <button io ng-click="$io.emit('message', myMessage)">Send</button>
    </div>
    <script>
      angular.module('testApp', ['angular-io'])
        .config(['$ioProvider', function($ioProvider) {
            $ioProvider.connect();
        }])
        .controller('testController', ['$scope', '$io', function($scope, $io) {
          $io.default.emit('message', 'I am in.');
          $io.default.on('toast', function (data) {
            $scope.$apply(function () {
              $scope.status = data;
            })
          });
          $scope.status = 'Idle';
          $scope.messages = [];
        }]);
    </script>
  </body>
</html>
```


##Installation

Install via Npm:

```bash
$ npm install angular-io --save
```

Install via Bower:

```bash
$ bower install angular-io --save
```


## Features

Pending...

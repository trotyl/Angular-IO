# Angular Socket

A concise, reliable and powerful library to make use of [Socket.io](http://socket.io/) in [Angular.js](https://angularjs.org/).

Providing the capability for just writing declarative code benefit from Angular Directive.


```html
<html ng-app="myApp">
  <head></head>
  <body ng-controller="myController">
    <div io io-connect="status = 'Connected'" io-error="status = 'Error'">
      {{ status }}
      <ul io io-message="messages.push($data)">
        <li ng-repeat="message in messages">
      </ul>
      <input type="text" ng-model="myMessage"/>
      <button io ng-click="$emit(myMessage)">Send</button>
    </div>
    <script>
      angular.module('myApp', ['angular-socket'])
        .config(['$ioProvider', function(ioProvider) {
          ioProvider.connect('http://localhost');
        }])
        .controller('myController', ['$scope', function($scope, $io) {
          $io.default.emit('I am in.");
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
$ npm install angular-socket
```

Install via Bower:

```bash
$ bower install angular-socket
```


## Features

Pending...

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
$ bower install angular.io --save
```


## Usage

The library support both Directive operation and Service operation.

The documentation is on the way. The simple description on directive is:

The single `io` attribute is equal to `io="default"` .

The `io="name" io-event="expression"` equals to :

```js
var someController = ['$scope', '$io', function($scope, $io) {
  $io.name.on('event', function() {
    $scope.$apply(function() {
      expression;  //Variable attached to current $scope
    };
  };
}];
```

The default socket is created by `$ioProvider.connect(url)` .

The other sockets are created by `$ioProvider.register(name, url)` .

All of the their functionality are same.


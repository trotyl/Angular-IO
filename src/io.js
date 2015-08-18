angular.module('angular-io', [])

  .provider('$ioProvider', [function() {
    if(!io) {
      throw new ReferenceError('The Socket.io script is needed!');
    }

    var socketCache = {};

    var self = this;

    this.connect = function(url) {
      self.register('default', url);
    };

    this.register = function (name, url) {
      socketCache[name] = io(url);
    };

    this.getSockets = function () {
      return socketCache;
    };

    this.getSocket = function (name) {
      return socketCache[name];
    };

  }])

  .service('$io', ['$ioProvider', function ($ioProvider) {
    var sockets = $ioProvider.getSockets();

    for(var name in sockets) {
      this[name] = sockets[name];
    }

  }])

  .directive('io', ['$ioProvider', 'lowercaseFilter', function ($ioProvider, lowercaseFilter) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, iElement, iAttrs, controller) {
        var socketName = iAttrs[io] || 'default';
        var socket = $ioProvider.getSocket(socketName);
        for(var attrName in iAttrs) {
          if(attrName.startWith && attrName.startWith('io') && attrName != 'io') {
            socket.on(lowercaseFilter(attrName.replace('io', '')), function (data) {
              $parse(iAttrs[attrName])(scope, {$data: data});
            })
          }
        }
        scope.$io = socket;
      }
    };

  }])
;

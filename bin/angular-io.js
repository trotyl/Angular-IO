angular.module('angular-io', [])

  .provider('$io', [function() {
    if(!io) {
      throw new ReferenceError('The Socket.io script is needed!');
    }

    var socketCache = {};

    this.connect = function(url) {
      this.register('default', url);
    };

    this.register = function (name, url) {
      socketCache[name] = io(url);
    };

    this.$get = function () {
      return socketCache;
    };

  }])

  .directive('io', ['$io', 'lowercaseFilter', function ($io, lowercaseFilter) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, iElement, iAttrs, controller) {
        var socketName = iAttrs[io] || 'default';
        var socket = $io[socketName];
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

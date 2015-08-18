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

    this.$get = [function () {
      return socketCache;
    }];

  }])

  .directive('io', ['$parse', '$io', function ($parse, $io) {
    return {
      restrict: 'A',
      scope: true,
      link: function (scope, iElement, iAttrs, controller) {
        var socketName = iAttrs[io] || 'default';
        var socket = $io[socketName];
        for(var attrName in iAttrs) {
          if(attrName.startsWith && attrName.startsWith('io') && attrName != 'io') {
            var attr = attrName.replace('io', '').toLowerCase();
            var callback = iAttrs[attrName];
            socket.on(attr, function (data) {
              console.log(data);
              scope.$apply($parse(callback)(scope, {$data: data}));
            })
          }
        }
        scope.$io = socket;
      }
    };

  }])
;

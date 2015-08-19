angular.module('angular-io', [])

  .provider('$io', [function() {
    if(!io) {
      throw new ReferenceError('The Socket.io script is needed!');
    }

    var source = io;
    var registerCache = {};

    this.connect = function(url) {
      this.register('default', url);
    };

    this.register = function (name, url) {
      registerCache[name] = url;
    };

    this.source = function (src) {
      source = src;
    };

    this.$get = [function () {
      var service = {

      };

      for(var name in registerCache) {
        service[name] = source(registerCache[name]);
      }

      return service;
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

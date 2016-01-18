describe('uxsAuthTypeHandler configuration', function() {
  var uxsAuthTypeHandler;

  beforeEach(function() {
    angular.module('authTypeHandlerConfig', []).config(function(uxsAuthTypeHandlerProvider) {
      uxsAuthTypeHandlerProvider.setDefaultAuthType('any');
    });
    module('uxs', 'authTypeHandlerConfig');

  });

  beforeEach(inject(function(_uxsAuthTypeHandler_) {
    uxsAuthTypeHandler = _uxsAuthTypeHandler_;
  }));

  it('should provide default auth type', function() {
    expect(uxsAuthTypeHandler.getDefaultAuthType()).toEqual('any');
  });
});

describe('uxsAuthTypeHandler', function() {
  var uxsAuthTypeHandler;

  beforeEach(module('uxs'));

  beforeEach(inject(function(_uxsAuthTypeHandler_) {
    uxsAuthTypeHandler = _uxsAuthTypeHandler_;
  }));

  it('should inject mock factory', function() {
    expect(uxsAuthTypeHandler).toBeDefined();
  });

  describe('setAuthDefaultType | getAuthDefaultType', function() {
    it('should set default auth type', function() {
      uxsAuthTypeHandler.setDefaultAuthType('All');
      expect(uxsAuthTypeHandler.getDefaultAuthType()).toEqual('all');
    });

    it('should not set default auth type', function() {
      uxsAuthTypeHandler.setDefaultAuthType('some');
      expect(uxsAuthTypeHandler.getDefaultAuthType()).not.toEqual('all');
    });
  });

  describe('isAuthType', function() {
    it('should not match uxsAuthTypes constant', function() {
      expect(uxsAuthTypeHandler.isAuthType('some')).toBe(false);
    });

    it('should match uxsAuthTypes constant | capitalize', function() {
      expect(uxsAuthTypeHandler.isAuthType('All')).toBe(true);
    });

    it('should match uxsAuthTypes constant | uppercase', function() {
      expect(uxsAuthTypeHandler.isAuthType('ANY')).toBe(true);
    });

    it('should match uxsAuthTypes constant | whitespaces', function() {
      expect(uxsAuthTypeHandler.isAuthType(' none ')).toBe(true);
    });

    it('should match uxsAuthTypes constant | defaultType', function() {
      expect(uxsAuthTypeHandler.isAuthType(null)).toBe(true);
    });
  });
});

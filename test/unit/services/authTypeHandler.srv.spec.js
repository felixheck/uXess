describe('uxsAuthTypeHandler', function() {
  var _uxsAuthTypeHandler;

  beforeEach(module('uxs'));

  beforeEach(inject(function (uxsAuthTypeHandler) {
    _uxsAuthTypeHandler = uxsAuthTypeHandler;
  }));

  it('should inject mock factory', function () {
    expect(_uxsAuthTypeHandler).toBeDefined();
  });

  describe('setAuthDefaultType | getAuthDefaultType', function() {
    it('should set default auth type', function() {
      _uxsAuthTypeHandler.setDefaultAuthType('All');
      expect(_uxsAuthTypeHandler.getDefaultAuthType()).toEqual('all');
    });

    it('should not set default auth type', function() {
      _uxsAuthTypeHandler.setDefaultAuthType('some');
      expect(_uxsAuthTypeHandler.getDefaultAuthType()).not.toEqual('all');
    });
  });

  describe('isAuthType', function() {
    it('should not match uxsAuthTypes constant', function() {
      expect(_uxsAuthTypeHandler.isAuthType('some')).toBe(false);
    });

    it('should match uxsAuthTypes constant | capitalize', function() {
      expect(_uxsAuthTypeHandler.isAuthType('All')).toBe(true);
    });

    it('should match uxsAuthTypes constant | uppercase', function() {
      expect(_uxsAuthTypeHandler.isAuthType('ANY')).toBe(true);
    });

    it('should match uxsAuthTypes constant | whitespaces', function() {
      expect(_uxsAuthTypeHandler.isAuthType(' none ')).toBe(true);
    });

    it('should match uxsAuthTypes constant | defaultType', function() {
      expect(_uxsAuthTypeHandler.isAuthType(null)).toBe(true);
    });
  });
});

describe('uxsAccessHandler', function() {
  var _uxsPermitHandler;
  var _uxsAccessHandler;

  beforeEach(module('uxs'));

  beforeEach(inject(function (uxsPermitHandler, uxsAccessHandler) {
    _uxsPermitHandler = uxsPermitHandler;
    _uxsAccessHandler = uxsAccessHandler;
  }));

  it('should inject mock factory', function () {
    expect(_uxsPermitHandler).toBeDefined();
    expect(_uxsAccessHandler).toBeDefined();
  });

  describe('hasPermits', function () {
    it('should not match', function () {
      _uxsPermitHandler.setPermits(['admin']);
      expect(_uxsAccessHandler.hasPermits(['user'])).toBe(false);
    });

    it('should match', function () {
      _uxsPermitHandler.setPermits(['admin', 'user']);
      expect(_uxsAccessHandler.hasPermits(['user'])).toBe(true);
    });
  });

  describe('hasAnyPermits', function () {
    it('should not match', function () {
      _uxsPermitHandler.setPermits(['admin']);
      expect(_uxsAccessHandler.hasAnyPermits(['user'])).toBe(false);
    });

    it('should match', function () {
      _uxsPermitHandler.setPermits(['admin']);
      expect(_uxsAccessHandler.hasAnyPermits(['admin', 'user'])).toBe(true);
    });
  });

  describe('hasNonePermits', function () {
    it('should not match', function () {
      _uxsPermitHandler.setPermits(['admin']);
      expect(_uxsAccessHandler.hasNonePermits(['admin'])).toBe(false);
    });

    it('should match', function () {
      _uxsPermitHandler.setPermits(['admin']);
      expect(_uxsAccessHandler.hasNonePermits(['user'])).toBe(true);
    });
  });

  describe('isPermitted', function () {
    it('should be permitted ', function () {
      _uxsPermitHandler.setPermits('admin');
      expect(_uxsAccessHandler.isPermitted('admin, user', 'any')).toBe(true);
    });

    it('should not be permitted', function () {
      _uxsPermitHandler.setPermits('admin');
      expect(_uxsAccessHandler.isPermitted('admin, user', 'all')).toBe(false);
    });
  });

});
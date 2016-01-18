describe('uxsAccessHandler', function() {
  var uxsPermitHandler;
  var uxsAccessHandler;

  beforeEach(module('uxs'));

  beforeEach(inject(function(_uxsPermitHandler_, _uxsAccessHandler_) {
    uxsPermitHandler = _uxsPermitHandler_;
    uxsAccessHandler = _uxsAccessHandler_;
  }));

  it('should inject mock factory', function() {
    expect(uxsPermitHandler).toBeDefined();
    expect(uxsAccessHandler).toBeDefined();
  });

  describe('hasPermits', function() {
    it('should not match', function() {
      expect(uxsAccessHandler.hasPermits()).toBe(false);
    });

    it('should match', function() {
      uxsPermitHandler.setPermits(['admin']);
      expect(uxsAccessHandler.hasPermits()).toBe(true);
    });
  });

  describe('hasAllPermits', function() {
    it('should not match', function() {
      uxsPermitHandler.setPermits(['admin']);
      expect(uxsAccessHandler.hasAllPermits(['user'])).toBe(false);
    });

    it('should match', function() {
      uxsPermitHandler.setPermits(['admin', 'user']);
      expect(uxsAccessHandler.hasAllPermits(['user'])).toBe(true);
    });
  });

  describe('hasAnyPermits', function() {
    it('should not match', function() {
      uxsPermitHandler.setPermits(['admin']);
      expect(uxsAccessHandler.hasAnyPermits(['user'])).toBe(false);
    });

    it('should match', function() {
      uxsPermitHandler.setPermits(['admin']);
      expect(uxsAccessHandler.hasAnyPermits(['admin', 'user'])).toBe(true);
    });
  });

  describe('hasNonePermits', function() {
    it('should not match', function() {
      uxsPermitHandler.setPermits(['admin']);
      expect(uxsAccessHandler.hasNonePermits(['admin'])).toBe(false);
    });

    it('should match', function() {
      uxsPermitHandler.setPermits(['admin']);
      expect(uxsAccessHandler.hasNonePermits(['user'])).toBe(true);
    });
  });

  describe('isPermitted', function() {
    it('should be permitted', function() {
      uxsPermitHandler.setPermits('admin');
      expect(uxsAccessHandler.isPermitted('admin, user', 'any')).toBe(true);
    });

    it('should not be permitted', function() {
      uxsPermitHandler.setPermits('admin');
      expect(uxsAccessHandler.isPermitted('admin, user', 'all')).toBe(false);
    });

    it('should be permitted | wildcard', function() {
      uxsPermitHandler.setPermits('admin');
      expect(uxsAccessHandler.isPermitted('*')).toBe(true);
    });

    it('should not be permitted | wildcard', function() {
      expect(uxsAccessHandler.isPermitted('*')).toBe(false);
    })
  });

});

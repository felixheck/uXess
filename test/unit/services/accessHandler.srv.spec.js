describe('uxess.accessHandler', function() {
  var _AccessHandler;
  var _PermitHandler;

  beforeEach(module('uxess'));

  beforeEach(inject(function (AccessHandler, PermitHandler) {
    _AccessHandler = AccessHandler;
    _PermitHandler = PermitHandler;
  }));

  it('should inject mock factory', function () {
    expect(_AccessHandler).toBeDefined();
  });

  describe('setAccessDefaultType | getAccessDefaultType', function() {
    it('should set default access type', function() {
      _AccessHandler.setDefaultAccessType('All');
      expect(_AccessHandler.getDefaultAccessType()).toEqual('all');
    });

    it('should not set default access type', function() {
      _AccessHandler.setDefaultAccessType('some');
      expect(_AccessHandler.getDefaultAccessType()).not.toEqual('all');
    });
  });

  describe('verifyAccessType', function() {
    it('should not match accessTypes constant', function() {
      expect(_AccessHandler.verifyAccessType('some')).toBe(false);
    });

    it('should match accessTypes constant | capitalize', function() {
      expect(_AccessHandler.verifyAccessType('All')).toBe(true);
    });

    it('should match accessTypes constant | uppercase', function() {
      expect(_AccessHandler.verifyAccessType('ANY')).toBe(true);
    });

    it('should match accessTypes constant | whitespaces', function() {
      expect(_AccessHandler.verifyAccessType(' none ')).toBe(true);
    });

    it('should match accessTypes constant | defaultType', function() {
      expect(_AccessHandler.verifyAccessType(null)).toBe(true);
    });
  });

  describe('isAccessible', function() {
    it('should be accessible ', function() {
      _PermitHandler.setPermits('admin');
      expect(_AccessHandler.isAccessible('admin, user', 'any')).toBe(true);
    });

    it('should not be accessible', function() {
      _PermitHandler.setPermits('admin');
      expect(_AccessHandler.isAccessible('admin, user', 'all')).toBe(false);
    });


  });
});
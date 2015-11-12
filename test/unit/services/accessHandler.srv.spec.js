describe('uxess.accessHandler', function() {
  var _AccessHandler;

  beforeEach(module('uxess'));

  beforeEach(inject(function (AccessHandler) {
    _AccessHandler = AccessHandler;
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
});
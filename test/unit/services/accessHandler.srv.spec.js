describe('uxess.accessHandler', function() {
  var _accessHandler;

  beforeEach(module('uxess'));

  beforeEach(inject(function (accessHandler) {
    _accessHandler = accessHandler;
  }));

  it('should inject mock factory', function () {
    expect(_accessHandler).toBeDefined();
  });

  describe('verifyAccessType', function() {
    it('should not match accessTypes constant', function() {
      expect(_accessHandler.verifyAccessType('some')).toBe(false);
    });

    it('should match accessTypes constant | capitalize', function() {
      expect(_accessHandler.verifyAccessType('All')).toBe(true);
    });

    it('should match accessTypes constant | uppercase', function() {
      expect(_accessHandler.verifyAccessType('ANY')).toBe(true);
    });

    it('should match accessTypes constant | whitespaces', function() {
      expect(_accessHandler.verifyAccessType(' none ')).toBe(true);
    });
  });
});
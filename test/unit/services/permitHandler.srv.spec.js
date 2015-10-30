describe('uxess.permitHandler', function() {
  var _permitHandler;

  beforeEach(module('uxess'));

  beforeEach(inject(function (permitHandler) {
    _permitHandler = permitHandler;
  }));

  it('should inject mock factory', function() {
    expect(_permitHandler).toBeDefined();
  });

  describe('setPermits | getPermits', function() {
    it('should set permits', function() {
      _permitHandler.setPermits(['admin']);
      expect(_permitHandler.getPermits()).toEqual(['admin']);
    });

    it('should set permits', function() {
      _permitHandler.setPermits(['admin']);
      expect(_permitHandler.getPermits()).toEqual(['admin']);
    });

    it('should set multiple permits', function() {
      _permitHandler.setPermits(['admin', 'user']);
      expect(_permitHandler.getPermits().length).toEqual(2);
    })
  });

  describe('parsePermits', function() {
    it('should get empty array', function() {
      expect(_permitHandler.parsePermits('')).toEqual([]);
    });

    it('should get empty array', function() {
      expect(_permitHandler.parsePermits(42)).toEqual([]);
    });

    it('should get array with one item', function() {
      expect(_permitHandler.parsePermits('admin')).toEqual(['admin']);
    });

    it('should get array with multiple items | string whitespaces', function() {
      expect(_permitHandler.parsePermits('admin,user ')).toEqual(['admin', 'user']);
    });

    it('should get array with multiple items | array', function() {
      expect(_permitHandler.parsePermits(['admin', 'user'])).toEqual(['admin', 'user']);
    });

    it('should get array with multiple items | uppercase', function() {
      expect(_permitHandler.parsePermits(['ADMIN', 'USER'])).toEqual(['admin', 'user']);
    });
  });

  describe('hasPermits', function() {
    it('should not match', function() {
      _permitHandler.setPermits(['admin']);
      expect(_permitHandler.hasPermits(['user'])).toBe(false);
    });

    it('should match', function() {
      _permitHandler.setPermits(['admin', 'user']);
      expect(_permitHandler.hasPermits(['user'])).toBe(true);
    });
  });

  describe('hasAnyPermits', function() {
    it('should not match', function() {
      _permitHandler.setPermits(['admin']);
      expect(_permitHandler.hasAnyPermits(['user'])).toBe(false);
    });

    it('should match', function() {
      _permitHandler.setPermits(['admin']);
      expect(_permitHandler.hasAnyPermits(['admin', 'user'])).toBe(true);
    });
  });

  describe('hasNonePermits', function() {
    it('should not match', function() {
      _permitHandler.setPermits(['admin']);
      expect(_permitHandler.hasNonePermits(['admin'])).toBe(false);
    });

    it('should match', function() {
      _permitHandler.setPermits(['admin']);
      expect(_permitHandler.hasNonePermits(['user'])).toBe(true);
    });
  });
});
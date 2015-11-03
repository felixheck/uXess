describe('uxess.permitHandler', function() {
  var _PermitHandler;
  var _rootScope;

  beforeEach(module('uxess'));

  beforeEach(inject(function ($rootScope, PermitHandler) {
    _rootScope = $rootScope;
    _PermitHandler = PermitHandler;
  }));

  it('should inject mock factory', function() {
    expect(_PermitHandler).toBeDefined();
  });

  describe('setPermits | getPermits', function() {
    it('should set permits', function() {
      _PermitHandler.setPermits(['admin']);
      expect(_PermitHandler.getPermits()).toEqual(['admin']);
    });

    it('should set permits', function() {
      _PermitHandler.setPermits(['admin']);
      expect(_PermitHandler.getPermits()).toEqual(['admin']);
    });

    it('should set multiple permits', function() {
      _PermitHandler.setPermits(['admin', 'user']);
      expect(_PermitHandler.getPermits().length).toEqual(2);
    });

    it('should broadcast event', function() {
      spyOn(_rootScope, '$broadcast').and.callThrough();
      _PermitHandler.setPermits('admin');
      expect(_rootScope.$broadcast).toHaveBeenCalled();
    });
  });

  describe('parsePermits', function() {
    it('should get empty array | empty string', function() {
      expect(_PermitHandler.parsePermits('')).toEqual([]);
    });

    it('should get empty array | number', function() {
      expect(_PermitHandler.parsePermits(42)).toEqual([]);
    });

    it('should get empty array | null', function() {
      expect(_PermitHandler.parsePermits(null)).toEqual([]);
    });

    it('should get empty array | undefined', function() {
      expect(_PermitHandler.parsePermits(undefined)).toEqual([]);
    });

    it('should get empty array | empty array', function() {
      expect(_PermitHandler.parsePermits([])).toEqual([]);
    });

    it('should get empty array | empty object', function() {
      expect(_PermitHandler.parsePermits({})).toEqual([]);
    });

    it('should get empty array | object', function() {
      expect(_PermitHandler.parsePermits({answer: 42})).toEqual([]);
    });

    it('should get array with one item', function() {
      expect(_PermitHandler.parsePermits('admin')).toEqual(['admin']);
    });

    it('should get array with multiple items | string whitespaces', function() {
      expect(_PermitHandler.parsePermits('admin,user ')).toEqual(['admin', 'user']);
    });

    it('should get array with multiple items | array', function() {
      expect(_PermitHandler.parsePermits(['admin', 'user'])).toEqual(['admin', 'user']);
    });

    it('should get array with multiple items | uppercase', function() {
      expect(_PermitHandler.parsePermits(['ADMIN', 'USER'])).toEqual(['admin', 'user']);
    });
  });

  describe('hasPermits', function() {
    it('should not match', function() {
      _PermitHandler.setPermits(['admin']);
      expect(_PermitHandler.hasPermits(['user'])).toBe(false);
    });

    it('should match', function() {
      _PermitHandler.setPermits(['admin', 'user']);
      expect(_PermitHandler.hasPermits(['user'])).toBe(true);
    });
  });

  describe('hasAnyPermits', function() {
    it('should not match', function() {
      _PermitHandler.setPermits(['admin']);
      expect(_PermitHandler.hasAnyPermits(['user'])).toBe(false);
    });

    it('should match', function() {
      _PermitHandler.setPermits(['admin']);
      expect(_PermitHandler.hasAnyPermits(['admin', 'user'])).toBe(true);
    });
  });

  describe('hasNonePermits', function() {
    it('should not match', function() {
      _PermitHandler.setPermits(['admin']);
      expect(_PermitHandler.hasNonePermits(['admin'])).toBe(false);
    });

    it('should match', function() {
      _PermitHandler.setPermits(['admin']);
      expect(_PermitHandler.hasNonePermits(['user'])).toBe(true);
    });
  });
});
describe('uxsPermitHandler', function() {
  var _uxsPermitHandler;
  var _rootScope;

  beforeEach(module('uxs'));

  beforeEach(inject(function ($rootScope, uxsPermitHandler) {
    _rootScope = $rootScope;
    _uxsPermitHandler = uxsPermitHandler;
  }));

  it('should inject mock factory', function() {
    expect(_uxsPermitHandler).toBeDefined();
  });

  describe('setPermits | getPermits', function() {
    it('should set permits', function() {
      _uxsPermitHandler.setPermits(['admin']);
      expect(_uxsPermitHandler.getPermits()).toEqual(['admin']);
    });

    it('should set permits', function() {
      _uxsPermitHandler.setPermits(['admin']);
      expect(_uxsPermitHandler.getPermits()).toEqual(['admin']);
    });

    it('should set multiple permits', function() {
      _uxsPermitHandler.setPermits(['admin', 'user']);
      expect(_uxsPermitHandler.getPermits().length).toEqual(2);
    });

    it('should broadcast event', function() {
      spyOn(_rootScope, '$broadcast').and.callThrough();
      _uxsPermitHandler.setPermits('admin');
      expect(_rootScope.$broadcast).toHaveBeenCalled();
    });
  });

  describe('parsePermits', function() {
    it('should get empty array | empty string', function() {
      expect(_uxsPermitHandler.parsePermits('')).toEqual([]);
    });

    it('should get empty array | number', function() {
      expect(_uxsPermitHandler.parsePermits(42)).toEqual([]);
    });

    it('should get empty array | null', function() {
      expect(_uxsPermitHandler.parsePermits(null)).toEqual([]);
    });

    it('should get empty array | undefined', function() {
      expect(_uxsPermitHandler.parsePermits(undefined)).toEqual([]);
    });

    it('should get empty array | empty array', function() {
      expect(_uxsPermitHandler.parsePermits([])).toEqual([]);
    });

    it('should get empty array | empty object', function() {
      expect(_uxsPermitHandler.parsePermits({})).toEqual([]);
    });

    it('should get empty array | object', function() {
      expect(_uxsPermitHandler.parsePermits({answer: 42})).toEqual([]);
    });

    it('should get array with one item', function() {
      expect(_uxsPermitHandler.parsePermits('admin')).toEqual(['admin']);
    });

    it('should get array with multiple items | string whitespaces', function() {
      expect(_uxsPermitHandler.parsePermits('admin,user ')).toEqual(['admin', 'user']);
    });

    it('should get array with multiple items | array', function() {
      expect(_uxsPermitHandler.parsePermits(['admin', 'user'])).toEqual(['admin', 'user']);
    });

    it('should get array with multiple items | uppercase', function() {
      expect(_uxsPermitHandler.parsePermits(['ADMIN', 'USER'])).toEqual(['admin', 'user']);
    });
  });
});

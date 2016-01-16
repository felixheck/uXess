describe('uxsPermitHandler configuration', function() {
  var uxsPermitHandler;

  beforeEach(function () {
    angular.module('permitHandlerConfig', []).config(function (uxsPermitHandlerProvider) {
      uxsPermitHandlerProvider.setPermits('admin');
    });
    module('uxs', 'permitHandlerConfig');

  });

  beforeEach(inject(function (_uxsPermitHandler_) {
    uxsPermitHandler = _uxsPermitHandler_;
  }));

  it('should provide permits', function() {
    expect(uxsPermitHandler.getPermits()).toEqual(['admin']);
  });
});

describe('uxsPermitHandler', function() {
  var uxsPermitHandler;
  var $rootScope;

  beforeEach(module('uxs'));

  beforeEach(inject(function (_$rootScope_, _uxsPermitHandler_) {
    $rootScope = _$rootScope_;
    uxsPermitHandler = _uxsPermitHandler_;
  }));

  it('should inject mock factory', function() {
    expect($rootScope).toBeDefined();
    expect(uxsPermitHandler).toBeDefined();
  });


  describe('setPermits | getPermits', function() {
    it('should set permits', function() {
      uxsPermitHandler.setPermits(['admin']);
      expect(uxsPermitHandler.getPermits()).toEqual(['admin']);
    });

    it('should set permits', function() {
      uxsPermitHandler.setPermits(['admin']);
      expect(uxsPermitHandler.getPermits()).toEqual(['admin']);
    });

    it('should set multiple permits', function() {
      uxsPermitHandler.setPermits(['admin', 'user']);
      expect(uxsPermitHandler.getPermits().length).toEqual(2);
    });

    it('should broadcast event', function() {
      spyOn($rootScope, '$broadcast').and.callThrough();
      uxsPermitHandler.setPermits('admin');
      expect($rootScope.$broadcast).toHaveBeenCalled();
    });
  });

  describe('parsePermits', function() {
    it('should get empty array | empty string', function() {
      expect(uxsPermitHandler.parsePermits('')).toEqual([]);
    });

    it('should get empty array | number', function() {
      expect(uxsPermitHandler.parsePermits(42)).toEqual([]);
    });

    it('should get empty array | null', function() {
      expect(uxsPermitHandler.parsePermits(null)).toEqual([]);
    });

    it('should get empty array | undefined', function() {
      expect(uxsPermitHandler.parsePermits(undefined)).toEqual([]);
    });

    it('should get empty array | empty array', function() {
      expect(uxsPermitHandler.parsePermits([])).toEqual([]);
    });

    it('should get empty array | empty object', function() {
      expect(uxsPermitHandler.parsePermits({})).toEqual([]);
    });

    it('should get empty array | object', function() {
      expect(uxsPermitHandler.parsePermits({answer: 42})).toEqual([]);
    });

    it('should get array with one item', function() {
      expect(uxsPermitHandler.parsePermits('admin')).toEqual(['admin']);
    });

    it('should get array with multiple items | string whitespaces', function() {
      expect(uxsPermitHandler.parsePermits('admin,user ')).toEqual(['admin', 'user']);
    });

    it('should get array with multiple items | numbers', function() {
      expect(uxsPermitHandler.parsePermits([42, 42])).toEqual(['42', '42']);
    });

    it('should get array with multiple items | null', function() {
      expect(uxsPermitHandler.parsePermits([null, null])).toEqual(['', '']);
    });

    it('should get array with multiple items | array', function() {
      expect(uxsPermitHandler.parsePermits(['admin', 'user'])).toEqual(['admin', 'user']);
    });

    it('should get array with multiple items | uppercase', function() {
      expect(uxsPermitHandler.parsePermits(['ADMIN', 'USER'])).toEqual(['admin', 'user']);
    });
  });
});

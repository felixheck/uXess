describe('uxsWildcardHandler configuration', function() {
  var uxsWildcardHandler;

  beforeEach(function() {
    angular.module('wildcardHandlerConfig', []).config(function(uxsWildcardHandlerProvider) {
      uxsWildcardHandlerProvider.setWildcard('***');
    });
    module('uxs', 'wildcardHandlerConfig');

  });

  beforeEach(inject(function(_uxsWildcardHandler_) {
    uxsWildcardHandler = _uxsWildcardHandler_;
  }));

  it('should provide permits', function() {
    expect(uxsWildcardHandler.getWildcard()).toEqual('***');
  });
});

describe('uxsPermitHandler', function() {
  var uxsWildcardHandler;

  beforeEach(module('uxs'));

  beforeEach(inject(function(_uxsWildcardHandler_) {
    uxsWildcardHandler = _uxsWildcardHandler_;
  }));

  it('should inject mock factory', function() {
    expect(uxsWildcardHandler).toBeDefined();
  });

  describe('setWildcard | getPermits', function() {
    it('should set wildcard', function() {
      uxsWildcardHandler.setWildcard('***');
      expect(uxsWildcardHandler.getWildcard()).toEqual('***');
    });
  });

  describe('parseWildcard', function() {
    it('should get string | empty', function() {
      expect(uxsWildcardHandler.parseWildcard('')).toEqual('');
    });

    it('should get string | number', function() {
      expect(uxsWildcardHandler.parseWildcard(9)).toEqual('9');
    });

    it('should get string | object', function() {
      expect(uxsWildcardHandler.parseWildcard({})).toEqual('[object Object]');
    });

    it('should get string | array', function() {
      expect(uxsWildcardHandler.parseWildcard([])).toEqual('');
    });

    it('should get string | null', function() {
      expect(uxsWildcardHandler.parseWildcard(null)).toEqual('*');
    });
  });
});

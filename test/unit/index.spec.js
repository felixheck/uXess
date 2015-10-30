describe('uxess', function() {
  beforeEach(module('uxess'));

  describe('dependencies', function() {
    it('should have cached templates', inject(function($templateCache) {
      expect($templateCache).toBeDefined();
      expect($templateCache.info().size).not.toBe(1);
    }));
  });
});
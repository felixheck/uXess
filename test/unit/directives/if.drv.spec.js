describe('uxsIf', function() {
  var $compile;
  var $rootScope;
  var newScope;
  var uxsPermitHandler;
  var testElement;

  beforeEach(module('uxs'));

  beforeEach(inject(function(_$compile_, _$rootScope_, _uxsPermitHandler_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      uxsPermitHandler = _uxsPermitHandler_;
  }));

  beforeEach(function() {
    newScope = $rootScope.$new();
  });

  describe('show html element', function () {
    it('should show html element | static value', function () {
      uxsPermitHandler.setPermits('admin');
      testElement = $compile('<div uxs-if="admin"><span>uXess</span></div>')(newScope);

      expect(testElement.next().html()).toBe('<span>uXess</span>');

    });

    it('should show html element | scope value', function () {
      newScope.permits = 'admin';
      uxsPermitHandler.setPermits('admin');
      testElement = $compile('<div uxs-if="permits"><span>uXess</span></div>')(newScope);
      $rootScope.$digest();

      expect(testElement.next().html()).toBe('<span>uXess</span>');

    });
  });

  describe('hide html element', function () {
    it('should hide html element | static value', function () {
      uxsPermitHandler.setPermits('user');
      testElement = $compile('<div uxs-if="admin"><span>uXess</span></div>')(newScope);

      expect(testElement.next()).toEqual({});

    });

    it('should hide html element | scope value', function () {
      newScope.permits = 'admin';
      uxsPermitHandler.setPermits('user');
      testElement = $compile('<div uxs-if="permits"><span>uXess</span></div>')(newScope);
      $rootScope.$digest();

      expect(testElement.next()).toEqual({});
    });
  });

  describe('toggle html element', function () {
    it('should show and hide html element', function () {
      uxsPermitHandler.setPermits('user');
      testElement = $compile('<div uxs-if="user"><span>uXess</span></div>')(newScope);
      uxsPermitHandler.setPermits('admin');

      expect(testElement.next()).toEqual({});
    });
  });

  describe('alternative parsing', function () {
    it('should use fallback parsing function', function () {
      newScope.demo = 'user';
      uxsPermitHandler.setPermits('user');
      testElement = $compile('<div uxs-if="{{ demo }}"><span>uXess</span></div>')(newScope);

      expect(testElement.next().html()).toBe('<span>uXess</span>');
    });

    it('should use fallback parsing function', function () {
      newScope.demo = 'user';
      uxsPermitHandler.setPermits('user');
      testElement = $compile('<div uxs-if="user"><span>uXess</span></div>')(newScope);

      expect(testElement.next().html()).toBe('<span>uXess</span>');
    });
  });
});
describe('Change Permits in Runtime', function() {
  beforeEach(function() {
    browser.get('http://localhost:8080/sample/');
  });

  describe('Check `user` checkbox', function() {
    beforeEach(function() {
      element.all(by.name('user')).first().click();
    });

    it('should have `none` button removed', function() {
      expect(element(by.id('none')).isPresent()).toBe(false)
    });
    it('should have `any` button displayed', function() {
      expect(element(by.id('any')).isPresent()).toBe(true)
    });
    it('should have `all` button removed', function() {
      expect(element(by.id('all')).isPresent()).toBe(false)
    });
  });

  describe('Check `editor` checkbox', function() {
    beforeEach(function() {
      element.all(by.name('user')).first().click();
      element.all(by.name('editor')).first().click();
    });

    it('should have `none` button removed', function() {
      expect(element(by.id('none')).isPresent()).toBe(false)
    });
    it('should have `any` button displayed', function() {
      expect(element(by.id('any')).isPresent()).toBe(true)
    });
    it('should have `all` button removed', function() {
      expect(element(by.id('all')).isPresent()).toBe(true)
    });
  });

  describe('Check `admin` checkbox', function() {
    beforeEach(function() {
      element.all(by.name('user')).first().click();
      element.all(by.name('editor')).first().click();
      element.all(by.name('admin')).first().click();
    });

    it('should have `none` button removed', function() {
      expect(element(by.id('none')).isPresent()).toBe(true)
    });
    it('should have `any` button displayed', function() {
      expect(element(by.id('any')).isPresent()).toBe(true)
    });
    it('should have `all` button removed', function() {
      expect(element(by.id('all')).isPresent()).toBe(false)
    });
  });
});

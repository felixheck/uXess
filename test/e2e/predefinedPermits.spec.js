describe('Permit Provider Configuration', function() {
  beforeEach(function() {
    browser.get('http://localhost:8080/sample/');
  });

  describe('Checkboxes', function() {
    it('should have `admin` checked', function() {
      expect(element.all(by.name('admin')).first().isSelected()).toBe(true);
    });
    it('should have `user` unchecked', function() {
      expect(element.all(by.name('user')).first().isSelected()).toBe(false);
    });
    it('should have `editor` unchecked', function() {
      expect(element.all(by.name('editor')).first().isSelected()).toBe(false);
    });
  });

  describe('Buttons', function() {
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
});

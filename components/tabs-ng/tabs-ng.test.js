import 'angular';
import 'angular-route';
import 'angular-mocks';
import 'dom4';

import './tabs-ng';

describe('TabsNg', function () {
  let $rootScope;
  let $compile;

  function getActiveTab(element) {
    return {
      title: element[0].query('.active'),
      content: element[0].query('div.ring-tabs__container')
    };
  }

  beforeEach(window.module('Ring.tabs'));

  /* global inject */
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  describe('DOM', function () {
    it('Empty tabs', function () {
      const element = $compile(
        '<rg-tabs>' +
        '</rg-tabs>'
      )($rootScope);

      $rootScope.$digest();

      element[0].should.match('div.ring-tabs');
    });

    it('One tab', function () {
      const element = $compile(
        '<rg-tabs>' +
        '<rg-tabs-pane x-title="General">' +
        'General' +
        '</rg-tabs-pane>' +
        '</rg-tabs>'
      )($rootScope);

      $rootScope.$digest();
      const tab = getActiveTab(element);

      tab.title.firstChild.should.contain.text('General');
      tab.content.should.contain.text('General');
    });

    it('Two tabs', function () {
      const element = $compile(
        '<rg-tabs>' +
        '<rg-tabs-pane x-title="General">' +
        'General' +
        '</rg-tabs-pane>' +
        '<rg-tabs-pane x-title="Second">' +
        'Second' +
        '</rg-tabs-pane>' +
        '</rg-tabs>'
      )($rootScope);
      element.isolateScope().control.next();

      $rootScope.$digest();

      const tab = getActiveTab(element);

      tab.title.firstChild.should.contain.text('Second');
      tab.content.should.contain.text('Second');
    });
  });
});

(function () {
  'use strict';

  angular
    .module('articles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
//    Menus.addMenuItem('topbar', {
//      title: 'Articles123',
//      state: 'articles',
//      type: 'dropdown',
//      roles: ['*']
//    });
//
//    // Add the dropdown list item
//    Menus.addSubMenuItem('topbar', 'articles', {
//      title: 'List Articles',
//      state: 'articles.list',
//       roles: ['*']
//    });
//
//    // Add the dropdown create item
//    Menus.addSubMenuItem('topbar', 'articles', {
//      title: 'Create Article',
//      state: 'articles.create',
//      roles: ['*']
//    });
  }
})();

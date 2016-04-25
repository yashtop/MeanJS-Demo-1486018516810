(function (app) {
  'use strict';

  app.registerModule('emppanda');
  app.registerModule('vendor.services');
  app.registerModule('employee.services');
    app.registerModule('order.services');
  app.registerModule('emppanda.routes', ['ui.router', 'vendor.services', 'employee.services', 'order.services']);
})(ApplicationConfiguration);

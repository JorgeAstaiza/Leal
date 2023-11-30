const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'MF-gestion-clientes',

  exposes: {
    './routes': './projects/mf-gestion-clientes/src/app/app.routes.ts',
    './ClientesComponent': './projects/mf-gestion-clientes/src/app/pages/clientes/clientes.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  sharedMappings: ["@commons-lib"]

});

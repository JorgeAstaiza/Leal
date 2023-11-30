const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'MF-analisis-ventas',

  exposes: {
    './routes': './projects/mf-analisis-ventas/src/app/app.routes.ts',
    './VentasComponent': './projects/mf-analisis-ventas/src/app/pages/grafico-ventas/grafico-ventas.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
  sharedMappings: ["@commons-lib"]

});

const webpack = require('webpack');
const webpackConfig = require('../extra-webpack.config.js');
const path = require('path');
const fs = require('fs');

// Primero, ejecuta el comando ng build
const { execSync } = require('child_process');
console.log('Ejecutando ng build...');
execSync('ng build --prod --output-hashing=none', { stdio: 'inherit' });

// Luego, ejecuta webpack con nuestra configuración personalizada
console.log('Configurando webpack...');
webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err || stats.toString({
      chunks: false,
      colors: true
    }));
    return;
  }

  console.log(stats.toString({
    chunks: false,
    colors: true
  }));

  console.log('Build completado exitosamente!');
});

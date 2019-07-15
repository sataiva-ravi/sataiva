/////////////////////////
// Library CSS Files
// Add your library css files here
///////////////////////////////////////////////
require('../node_modules/bootstrap/dist/css/bootstrap.css'); 
require('../src/scss/css/font-awesome.css');
require('../src/scss/css/ripple.min.css');
require('../src/scss/css/animate.css');
require('../src/scss/css/slick.css');
require('../src/scss/css/nProgress.css');
//////////////////
// LIBRARY FILES
// Add your custom library js requires heres
// use: expose-loader  to expose a library to public access
////////////////////////////////////////////////////////////
require('expose-loader?$!expose-loader?jQuery!jquery');
require('expose-loader?window.Tether!tether');
//require('bootstrap');
//////////////////  
// APP SCSS FILES
// do not change this 
// Imports custom js modules in JS folder
//////////////////////////////////////////
var requireSCSS = require.context('./scss', false, /\.scss$/);
requireSCSS.keys().forEach(requireSCSS);

////////////////// 
// APP JS FILES
// do not change this 
// Imports custom js modules in JS folder
//////////////////////////////////////////
var requireJS = require.context('./js', true, /\.js$/);
requireJS.keys().forEach(requireJS); 
 
//////////////////
// APP INIT
// Application Init module. 
////////////////////////////////////////////////////////////


// require('babel-register');

const Router = require('./component/Router');
const Sitemap = require('react-router-sitemap').default;

new Sitemap(Router).build('https://devkits.net').save('./sitemap.xml');

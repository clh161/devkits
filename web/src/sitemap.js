import Generator from 'react-router-sitemap-generator';
const { Router } = require('./component/Router');

const generator = new Generator('https://devkits.net', Router);
generator.save('public/sitemap.xml');

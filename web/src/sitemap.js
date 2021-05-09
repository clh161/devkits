import Generator from 'react-router-sitemap-generator';
import Router from './component/Router';

const generator = new Generator('https://devkits.net', Router);
generator.save('public/sitemap.xml');

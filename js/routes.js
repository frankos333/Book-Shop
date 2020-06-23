import bookApp from "./pages/book-app.cmp.js";
import bookDetails from "./pages/book-details.cmp.js";
import homePage from './pages/home-page.cmp.js';
import aboutUs from "./pages/about-us.cmp.js";

const myRoutes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/book',
        component: bookApp
    },

    {
        path: '/book/:bookId',
        component: bookDetails
    },
    {
        path: '/about/',
        component: aboutUs
    }
];

export const myRouter = new VueRouter({ routes: myRoutes })
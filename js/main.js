import { myRouter } from "./routes.js";
import appHeader from './cmps/app-header.cmp.js'

import userMsg from './cmps/user-msg.cmp.js';

new Vue({
    el: "#App",
    router: myRouter,
    template: `
        <div>
            <user-msg/>
            <app-header/>
            <main>
                <router-view />
            </main>

            <footer class="main-footer">
               <p>
                   <i class="far fa-copyright"></i> 
                Created by Nadav Frank ft Kazeeee Abale
            </p>
            </footer>

        </div>
    `,
    methods: {},
    components: {
        appHeader,
        userMsg
    }
});
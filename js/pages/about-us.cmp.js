export default {
    template: `
        <section class="about-us">
            <transition name="bounce">
                <h2 v-if="isShowTitle">About Us!</h2>
            </transition>
            <pre>
                <i class="fas fa-phone-alt"></i> Telephone: Buy our 144 book and u'll know <i class="far fa-grin-wink"></i>

                <i class="fas fa-inbox"></i> Contact Us : <a href="#">KazeAbale@gmail.com</a></pre>           
                <img src="imgs/book.png">
            </pre>
        </section>
    `,
    data() {
        return {
            inetvalId: 0,
            isShowTitle: false
        }
    },
    created() {
        this.inetvalId = setInterval(() => {
            console.log('say hi');
        }, 2000);
        setTimeout(() => {
            this.isShowTitle = !this.isShowTitle
        }, 500)
    },
    destroyed() {
        clearInterval(this.inetvalId);
        console.log('about page was destroyed');
    }
}
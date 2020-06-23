import txtWrapper from "../cmps/book-description.cpm.js";
import { bookService } from "../services/book-service.js";
import bookReview from '../cmps/book-review.cmp.js'

export default {
    template: `
        <section class="book-details" v-if="book">
            <button class="close-btn" @click="close">Go Back!</button>
            <header class="modal-header flex justify-center">
                <h2>{{book.title}} : </h2>
                <h2 :class="isExpensive"> {{bookValue}}</h2>
                <img class="sale-img" v-if="book.listPrice.isOnSale" :src="imgURL"/>
            </header> 
            <div class="author" >
                <p > 
                    Written by 
                    <span v-for="author in book.authors">,{{ author }}</span>
                </p>
            </div>
            <h3>{{bookLength}}</h3>
            <h4>{{publishedAt}}</h4>
            <h4> Subtitle:{{ book.subtitle }} </h4>
            <txt-wrapper :txt="book.description" />
        <book-review :book="book" class="reviews"/>
        <img class="thumbnail" :src="book.thumbnail" />
        </section>
    `,
    data() {
        return {
            book: null,
        };
    },

    methods: {
        close() {
            this.$router.push('/book');
        },
    },

    computed: {
        bookValue() {
            const bookPrice = this.book.listPrice;
            return new Intl.NumberFormat(bookPrice.language, {
                style: "currency",
                currency: bookPrice.currencyCode,
            }).format(bookPrice.amount);
        },
        bookLength() {
            let str = "";
            const pages = this.book.pageCount;
            str =
                pages > 500 ?
                `That's one long book! it contains ${pages} pages` :
                pages < 100 ?
                `A light book to read , it only contains ${pages} pages` :
                `The average book to enjoy , contains ${pages} pages`;
            return str;
        },
        publishedAt() {
            const publishDate = this.book.publishedDate;
            const currYear = new Date().getFullYear();
            let str = "";
            str =
                currYear - publishDate > 10 ?
                "An old classic , published at: " + publishDate :
                currYear - publishDate < 1 ?
                "New! ,Published this year!" :
                "This book was published at: " + publishDate;
            return str;
        },
        isExpensive() {
            if (this.book.listPrice.amount > 150) return "red";
            else if (this.book.listPrice.amount < 20) return "green";
            // return {
            //     red: this.book.listPrice.amount > 150,
            //     green: this.book.listPrice.amount < 20,
            // };
        },
        imgURL() {
            if (this.book.listPrice.isOnSale) {
                return `imgs/on-sale.png`;
            }
        },
    },
    components: {
        txtWrapper,
        bookReview
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getBookById(bookId)
            .then((book) => {
                this.book = book;
            });

    },
};
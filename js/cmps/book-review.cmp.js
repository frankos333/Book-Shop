import starRate from "./star-rate.cmp.js";
import { bookService } from "../services/book-service.js";

import {eventBus} from '../services/event-bus.service.js';

export default {
    props: ["book"],
    template: `
    <section v-if="book">
        <div>
            <h3> Reviews </h3>
            <ul v-if="hasReviews" class="clean-list">
                <li v-for="(review,idx) in book.reviews">
                    <button @click="deleteReview(idx)" title="Delete review"></button>
                    <p>Review by {{review.fullName}} , {{review.stars}} Stars</p> 
                    <p>Posted at: {{review.readAt}}</p> 
                    <p>Added Text: {{review.freeText}}</p> 
                </li>
            </ul>
        </div>
        <form class="review" @submit.prevent="addReview">
            <input type="text" ref="userNameInput" placeholder="Username" v-model="reviewToEdit.fullName"/>
            <label>Rating: <star-rate @starSelection="setRate"/></label>
            <input type="date" v-model="reviewToEdit.readAt">
            <textarea v-model="reviewToEdit.freeText" placeholder="add something..."></textarea>
            <button>Save Review</button>
        </form>
    </section>
    `,
    data() {
        return {
            reviewToEdit: {
                fullName: "Books Reader",
                stars: 1,
                readAt: this.formattedDate,
                freeText: "",
            },
        };
    },
    methods: {
        setRate(stars) {
            this.reviewToEdit.stars = stars;
        },
        addReview() {
            bookService.addReview(this.bookId, this.reviewToEdit);
            eventBus.$emit('user-msg', `review was added successfully`);
        },
        deleteReview(reviewIdx) {
            bookService.removeReview(this.bookId, reviewIdx);
        },
    },

    computed: {
        formattedDate() {
            new Date().toISOString().substring(0, 10);
        },
        bookId() {
            return this.$route.params.bookId;
        },
        hasReviews() {
            return this.book.reviews && this.book.reviews.length > 0;
        },
    },

    components: {
        starRate,
    },
    mounted() {
        this.$refs.userNameInput.focus();
        console.log(this.$refs.userNameInput);
    },
};
import { bookService } from "../services/book-service.js";
import bookList from "../cmps/book-list.cmp.js";
import bookFilter from "../cmps/book-filter.cmp.js";


export default {
    template: `
        <main class="book-main book-app">
            <book-filter @filter="setFilter"/>
            <book-list :books="booksToShow"></book-list>           
        </main>
    `,
    data() {
        return {
            books: [],
            filterBy: null,
        };
    },
    computed: {
        booksToShow() {
            const filterBy = this.filterBy;
            if (!filterBy) return this.books;
            var filteredBooks = this.books.filter((book) => {
                const amount = book.listPrice.amount;
                if (
                    book.title.toLowerCase().includes(filterBy.byName.toLowerCase()) &&
                    amount >= filterBy.minPrice &&
                    amount <= filterBy.maxPrice
                ) {
                    return book;
                }
            });
            return filteredBooks;
        },
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
    },
    created() {
        bookService.getBooks()
            .then((books) => (this.books = books));
    },
    components: {
        bookList,
        bookFilter,
    },
};
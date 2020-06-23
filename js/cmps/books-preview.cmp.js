export default {
    props: ['book'],
    template: `
        <li class="book-preview flex column space-between">
            <router-link :to="'/book/' + book.id">
           <h3 class="title">{{book.title}}</h3>
           <img :src="book.thumbnail" class="img-prev" />
           <h3>Price:{{bookValue}}</h3>
           </router-link>
        </li>
    `,

    computed: {
        bookValue() {
            const bookPrice = this.book.listPrice
            return new Intl.NumberFormat(bookPrice.language, { style: 'currency', currency: bookPrice.currencyCode }).format(bookPrice.amount)
        }
    },
};
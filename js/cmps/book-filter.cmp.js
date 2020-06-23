export default {
    template: `
        <section class="book-filter flex space-between wrap">
            <input type="text" placeholder="Search title..." v-model="filterBy.byName" @input="filter"/>
            <input type="number" placeholder="From Price..." v-model.number="filterBy.minPrice" @input="filter"/>
            <input type="number" placeholder="To Price..." v-model.number="filterBy.maxPrice" @input="filter"/>
            <button @click="clearFilters"> Clear </button>
        </section>
    `,
    data() {
        return {
            filterBy: {
                byName: '',
                minPrice: -Infinity,
                maxPrice: Infinity
            }
        }
    },
    methods: {
        filter() {
            this.$emit('filter', this.filterBy);
        },
        clearFilters() {
            this.filterBy = {
                byName: '',
                minPrice: -Infinity,
                maxPrice: Infinity
            };
            this.$emit('filter', this.filterBy);
        }
    }
}
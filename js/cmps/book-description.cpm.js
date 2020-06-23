export default {
    props: ['txt'],
    template: `
    <div class="book-desc"> 
        <div class="short-text"> 
            <p v-if="!showAllText"> {{ shortText }} </p>
            <p v-else> {{ txt }}  </p>
            <button @click="toggleShowAll"> {{btnMsg}} </button> 
        </div>
    </div>
    `,
    data() {
        return {
            showAllText: false
        }
    },
    methods: {
        toggleShowAll() {
            this.showAllText = !this.showAllText;
        }
    },
    computed: {
        btnMsg() {
            return this.showAllText? 'Read Less' : 'Read More';
        },
        shortText() {
            if (!this.isLongText) return this.txt;
            return this.txt.slice(0, 100) + '...';
        },
        isLongText() {
            return (this.txt.length > 100)
        }
    }
};
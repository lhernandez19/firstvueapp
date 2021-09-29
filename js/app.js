const app = new Vue({
    el: '#app',
    // data: all the data for the app
    data: function() {
        return {
            newItem: {
                name: '',
                qty: 1,
                category: 'fruits'
            },

            shoppingList: [
                {name: 'Apple', qty: 5, purchased: false, category: 'fruits'},
                {name: 'Chicken wings', qty: 3, purchased: false, category: 'meats'},
                {name: 'Carrot', qty: 6, purchased: false, category: 'vegetables'},
                {name: 'Rib eye', qty: 2, purchased: true, category: 'meats'},
                {name: 'Fish', qty: 3, purchased: true, category: 'meats'}
            ],
        }
        
    },

    methods: {
        addIt: function(){
            this.shoppingList.push(this.newItem);

            this.newItem = {
                name: '',
                qty: 1,
                category: 'fruits'
            };

            $('#addItemModal').modal('hide');
        },

        removeIt(item){
            this.shoppingList.splice(this.shoppingList.indexOf(item), 1);
        },
    },

    computed: {
        fruitList: function(){
            return this.shoppingList.filter(function (item){
                return !item.purchased && item.category === 'fruits';
            });
        },

        meatList: function(){
            return this.shoppingList.filter(function (item){
                return !item.purchased && item.category === 'meats';
            });
        },

        vegetableList(){
            return this.shoppingList.filter(function (item){
                return !item.purchased && item.category === 'vegetables';
            });
        },

        shoppingCartList(){
            return this.shoppingList.filter(function (item){
                return item.purchased;
            });
        },
    },

    mounted: function() {
        if (localStorage.getItem('shoppingList')){
            this.shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
        }
    },

    watch: {
        shoppingList: {

            handler(newList){
                localStorage.setItem('shoppingList', JSON.stringify(newList))
            },

            deep: true,
        }
    }
});

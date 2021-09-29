Vue.component('List', {
    props: {
        name: {
            type: String,
            required: true,
        },
        items: {
            type: Array,
            required: true,
        },
    },

    methods: {
    },

    computed: {
    },

    template: ` <div class="get-it-list">
                    <h3>{{name}} </h3> 
                        <ul class="list-group list-group-flush">
                            <list-item v-for="item in items" 
                                       :item="item" 
                                       :key="item.name"
                                       @remove-item="$emit('remove-item', item)"
                            ></list-item>
                            
                        </ul>
                    <p class="text-center">
                      <small class="badge badge-primary ">Total {{name}}: {{items.length}}</small>
                    </p>
                </div> `,
});


Vue.component('ListItem', {
    data: function (){
        return {
            id: Math.floor(Math.random() * 10e16),
        };
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    methods: {
        add(item){
            item.qty++;
        },

        subtract(){
            this.item.qty--;

            if (this.item.qty <= 0){
                this.$emit('remove-item');
            }
        }
    },


    template: `<li class="list-group-item">
                    <div class=" d-flex justify-content-between">
                        <div class="custom-control custom-checkbox">
                            <input type="checkbox" :id="id" class="custom-control-input" v-model="item.purchased">
                            <label :for="id" class="custom-control-label">{{item.name}}</label>
                        </div>
                        <div>
                            <delete-it @remove-item="$emit('remove-item', item)"><delete-it>
                        </div>
                    </div> 
                    <div class=" d-flex justify-content-between">
                        <div>
                            <small>Qty: {{item.qty}}</small>
                        </div>
                        <div>
                            <button class="btn btn-tiny" v-on:click="add(item)"><i class="fas fa-plus-circle"></i></button>
                            <button class="btn btn-tiny" @click="subtract"><i class="fas fa-minus-circle"></i></button>
                        </div>
                    </div>
            </li> `,
});


Vue.component('DeleteIt',{
    
    props: {
        item: {
            type: Array,
            required: true,
        },
    },


    methods: {
        removeIt(item){
            this.$emit('remove-item')
        }

    },

    template: `<button class="btn btn-tiny" @click="removeIt"><i class="fas fa-trash-alt"></i>
    </button>
    `,
});

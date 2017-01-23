Vue.component('modal', {
  // props: ['id', 'title', 'description'],
  template: '#modal-template'
})

var testVue = new Vue({
  el: '#app',
  data : {
    header : 'Add items to list:',
    item: { id: '', title: '', description: '', completed: false },
    items: [],
    showModal: false
  },
  created: function() {
    this.fetchItems();
  },

  methods: {
    fetchItems: function() {
      this.$http.get('items')
        .then((items) => {
          this.items = items.body || [];  //prefer this to $set
        }, (error) => {
          alert(error);
        });
    },
    addItem: function() {
      this.$http.post('items', this.item)
        .then((response) => {
          this.item.id = response.body.id;  //add generated ID
          this.items.push(this.item);
          this.item = {id : '', title : '', description : '', completed: false};
        }, (error) => {
          console.log(error);
        });
    },
    deleteItem: function(index) {
      console.log(this.items[index].title);
      if(confirm(`Are you sure you want to delete this item at index ${index}?`)) {
        this.$http.put('items/delete', this.items[index])
          .then((response) => {
            console.log('success');
            this.items.splice(index,1);  //$remove
          }, (error) => {
            console.log(error);
          });
      }
    },
    updateItem: function(index) {
      console.log('UPDATE AT: ');
      console.log(index);
      if(confirm(`Are you sure you want to update this item at index ${index}?`)) {
        this.$http.put('items' + JSON.stringify({'title' : this.items[index].title}))
          .then((response) => {
            console.log('update success');

          }, (error) => {
            console.log(error);
          });
      } else { return }
    },
    completeItem: function(index) {
      console.log('Completed record index: ');
      console.log(index);
      this.items[index].completed = true;
      console.log(this.items[index].completed);
      if(confirm(`Are you sure you want to complete this item at index ${index}?`)) {
        this.$http.put('items', this.items[index])
          .then((response) => {
            console.log('task complete');

          }, (error) => {
            console.log(error);
          });
      } else { return }
    }
  } //methods
})

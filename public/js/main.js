Vue.component('modal', {
  ['id', 'name', 'title']
  template: '#modal-template'
})

var testVue = new Vue({
  el: '#app',
  data : {
    header : 'To Do List',
    item: { id: '', name: '', title: '' },
    items: [],
    showModal: false
  },
  created: function() {
    this.fetchItems();
  },

  methods: {
    fetchItems: function() {
      this.$http.get('titles')
        .then((items) => {
          this.items = items.body || [];  //prefer this to $set
        }, (error) => {
          alert(error);
        });
    },
    addItem: function() {
      this.$http.post('titles', this.item)
        .then((response) => {
          this.item.id = response.body.id;  //add generated ID
          this.items.push(this.item);
          this.item = {id : '', name : '', title : ''};
        }, (error) => {
          console.log(error);
        });
    },
    deleteItem: function(index) {
      console.log(this.items[index].name);
      if(confirm(`Are you sure you want to delete this title at index ${index}?`)) {
        this.$http.put('titles/delete', this.items[index])
          .then((response) => {
            console.log('success');
            this.items.splice(index,1);  //$remove
          }, (error) => {
            console.log(error);
          });
      }
    },
    updateItem: function() {
      console.log('UPDATE AT: ');
      console.log(index);
      if(confirm(`Are you sure you want to update this title at index ${index}?`)) {
        this.$http.put('titles' + JSON.stringify({'name' : this.items[index].name}))
          .then((response) => {
            console.log('update success');

          }, (error) => {
            console.log(error);
          });
      } else { return }
    }
  } //methods
})

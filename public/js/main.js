Vue.component('modal', {
  template: '#modal-template'
})

var testVue = new Vue({
  el: '#app',
  data : {
    header : 'Movie Quotes',
    item: { id: '', name: '', quote: '' },
    items: [],
    showModal: false
  },
  created: function() {
    this.fetchQuotes();
  },

  methods: {
    fetchQuotes: function() {
      this.$http.get('quotes')
        .then((items) => {
          this.items = items.body || [];  //prefer this to $set
        }, (error) => {
          alert(error);
        });
    },
    addQuote: function() {
      this.$http.post('quotes', this.item)
        .then((response) => {
          this.item.id = response.body.id;  //add generated ID
          this.items.push(this.item);
          this.item = {id : '', name : '', quote : ''};
        }, (error) => {
          console.log(error);
        });
    },
    deleteQuote: function(index) {
      console.log(this.items[index].name);
      if(confirm(`Are you sure you want to delete this quote at index ${index}?`)) {
        this.$http.put('quotes/delete', this.items[index])
          .then((response) => {
            console.log('success');
            this.items.splice(index,1);  //$remove
          }, (error) => {
            console.log(error);
          });
      }
    },
    updateQuote: function() {
      console.log('UPDATE AT: ');
      console.log(index);
      if(confirm(`Are you sure you want to update this quote at index ${index}?`)) {
        this.$http.put('quotes' + JSON.stringify({'name' : this.items[index].name}))
          .then((response) => {
            console.log('update success');

          }, (error) => {
            console.log(error);
          });
      } else { return }
    }
  } //methods
})

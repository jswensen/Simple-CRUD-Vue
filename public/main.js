var testVue = new Vue({
  el: '#app',
  data : {
    header : 'TESTING THE FORGE',
    item: { id: '', name: '', quote: '' },
    items: []
  },
  created: function() {
    this.fetchQuotes();
  },

  methods: {
    fetchQuotes: function() {
      let items = [
      {
        name: 'Hudson',
        quote: 'What do you mean they cut the power!?  They\'re animals!!'
      }, {
        name: 'Venkman',
        quote: 'Back off man, I\'m a scientist.'
      }, {
        name: 'Captain America',
        quote: 'There\'s only one god ma\'am, and I\'m pretty sure he doesn\'t dress like that.'
      }];

      this.$http.get('quotes')
        .then((items) => {
          //this.$set('events', events);
          console.log(items.body);
          this.items = items.body || []; //prefer this to $set

        }, (error) => {
          alert(error);
        });
    },
    addQuote: function() {

      this.$http.post('quotes', this.item)
        .then((response) => {
          this.items.push(this.item);
          console.log("Item added!");
        }, (error) => {
          console.log(error);
        });
    },
    deleteQuote: function(index) {
      if(confirm(`Are you sure you want to delete this quote at index ${index}?`)) {
        // this.$http.delete('quotes' + item.id)
        //   .then((response) => {
        //     this.items.splice(index,1); //$remove
        //   }, (error) => {
        //     console.log(error);
        //   });
        this.items.splice(index,1); //$remove
      }
    }
  } //methods
})



/**
var update = document.getElementById('update');

update.addEventListener('click', function() {
  fetch('quotes', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader',
      'quote': 'Bring my ship.'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
    //need to do some DOM manip here
    window.location.reload(true)
  })
  .catch(err => {
    console.log(err);
  })
});

var del = document.getElementById('delete');

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    console.log(res);
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data)
//need to do some DOM manip here
    window.location.reload(true)
  })
  .catch(err => {
    console.log(err);
  })
})
**/

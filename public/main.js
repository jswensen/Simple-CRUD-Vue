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
      this.$http.get('quotes')
        .then((items) => {
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
          console.log(response);
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
            this.items.splice(index,1); //$remove
          }, (error) => {
            console.log(error);
          });
      }
    },
    updateQuote: function(index) {
      if(confirm(`Are you sure you want to update this quote at index ${index}?`)) {
        this.$http.put('quotes' + JSON.stringify({'name' : this.items[index].name}))
          .then((response) => {
            console.log('update success');

          }, (error) => {
            console.log(error);
          });
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

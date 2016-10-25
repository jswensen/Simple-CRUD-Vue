var testVue = new Vue({
// We want to target the div with an id of 'events'
  el: '#app',
  // Here we can register any values or collections that hold data
  // for the application
  data : {
    header : 'TESTING THE FORGE',
    item: { name: '', quote: '' },
    items: []
  },
  // Anything within the ready function will run when the application loads
  ready: function() {
    this.fetchQuotes();
  },

  // Methods we want to use in our application are registered here
  methods: {
    fetchQuotes: function() {
      let items = [
      {
        id: 1,
        name: 'Darth Vader',
        description: 'You will die braver than most.'
      },
      {
        id: 2,
        name: 'Thor',
        description: 'You humans are so petty... and tiny',
      }];
      this.$set('items', items);
    },
    addQuote: function() {
    if(this.item.name) {
      this.itmes.push(this.item);
      this.item = { name: '', quote: '' };
    }
  }
  }
})




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

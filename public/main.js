var testVue = new Vue({
  el: '#app',
  data : {
    header : 'TESTING THE FORGE',
    item: { name: '', quote: '' },
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
        quote: 'Why don\'t you put her in charge!?'
      },
      {
        name: 'Thor',
        quote: 'You humans are so petty... and tiny',
      }];
      this.items = items || []; //prefer this to $set
    },
    addQuote: function() {
      if(this.item.name) {
        this.items.push(this.item);
        this.item = { name: '', quote: '' };
      }
    }
  } //methods
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

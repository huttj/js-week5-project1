$(document).ready(function() {

    var groceries = [{
        name: "Tomatoes",
        status: "needed",
        price: "3.99",
        quantity: 5,
    }, {
        name: "Onions",
        status: "needed",
        price: "1.85",
        quantity: 2
    }, {
        name: "Cilantro",
        status: "needed",
        price: ".95",
        quantity: 1
    }, {
        name: "Limes",
        status: "complete",
        price: ".33",
        quantity: 3
    }, {
        name: "Jalapeno",
        status: "complete",
        price: ".15",
        quantity: 2
    }];



    // Before we start anything, string up the css file, this javascript file, and
    // the jQuery CDN to grocery.html file.

    //1. Display the existing list of grocery items (from the grocery array)
    // in an unordered list in the "list" id that already exists in grocery.html.
    // Display each item's name, price, and quantity.
    // Ex: Tomatoes (5) @ $3.99
    var $list         = $("#list");
    var $addName      = $('#addName');
    var $addPrice     = $('#addPrice');
    var $addQuantity  = $('#addQuantity');
    var $total        = $('.totalCost').find('span');
    var $notification = $('#notification').hide();
    var $message      = $notification.children().eq(0);

    $('.close').on('click', function() {
      $notification.slideUp();
    });

    displayGroceryItems();

    sendMessage('Add a new grocery item to the list!');

    //2. Use the inputs and add button to add grocery items to the beginning of the list.
    // Default status should be "needed". The item should appear above the existing grocery items.
    $('.add-item').submit(function(event) {

      // Don't send the form to the server, or refresh the page
      event.preventDefault();

      var newItem = {
        name     : $addName.val(),
        price    : $addPrice.val(),
        quantity : $addQuantity.val(),
        status   : "needed"
      };

      var required = ['name', 'price', 'quantity'];

      // if (newItem.name === '') {
        // Throwing an error stops the function in its tracks
        //throw new Error('Name cannot be empty');
        // alert('Name cannot be empty');
        // return;
      // }

      for (var i = 0; i < required.length; i++) {
        var prop = required[i];
        if (newItem[prop] === '') {
          sendMessage(prop + ' cannot be empty');
          return;
        }
      }

      for (var i = 0; i < groceries.length; i++) {
        var item = groceries[i];
        if (newItem.name === item.name && newItem.price === item.price) {
          sendMessage('We\'re combining the ' + newItem.name + ' with the one(s) already in your cart.');
          newItem.quantity = parseFloat(newItem.quantity) + parseFloat(item.quantity);
          groceries.splice(i, 1);
          break;
        }
      }

      groceries.unshift(newItem);

      // This SETs the value of the input (in this case, and empty string)
      $addName.val('');
      $addPrice.val('');
      $addQuantity.val('');


      displayGroceryItems();

    });


    //3. Make sure that the grocery list displayed updates when you add an item to the list.
    // DONE!

    //3. Display the total cost of the groceries. Make sure this updates as you add items to the list.


    //4. Put a check in to make sure users aren't adding items without a name, price, or quantity.

    $list.on('click', 'li', function removeItem() {
        var i = $(this).data('id');

        groceries.splice(i, 1);

        displayGroceryItems();
    });

    function displayGroceryItems() {

      $list.empty();

      var total = 0;

      for (var i = 0; i < groceries.length; i++) {

          var item = groceries[i];

          // Create new item element for this
          var $li = $('<li></li>')
            .text(item.name + ' (' + item.quantity + ' @ $' + item.price + ') -- ' + item.status)
            .data('id', i);

          // Add to the list
          $list.append($li);

          // Keep track of the total
          total += item.quantity * item.price;

      }

      // Update the total
      $total.text(total.toFixed(2));

    }

    function sendMessage(str) {
      $message.text(str);
      $notification.slideDown();
    }

});

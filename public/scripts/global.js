$(document).ready(function() {
  $('#newEvent').on('click', '.event-submit', newEvent);
});

// Add Event
function newEvent(event) {
  console.log('debug');
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#newEvent input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all user info into one object
    var newEvent = {
      'title': $('#newEvent input#eventTitle').val(),
      'description': $('#newEvent textarea#eventDescription').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'POST',
      data: newEvent,
      url: '/addevent',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {

        // Clear the form inputs
        $('#newEvent input').val('');

        $('#admin-container').load(document.URL + '#admin-app');

        $('#newEvent').modal('hide')

      } else {

        // If something goes wrong, alert the error message that our service returned
        alert('Error: ' + response.msg);

      }
    });
  } else {
    // If errorCount is more than 0, error out
    alert('Please fill in all fields');
    return false;
  }
};

function sortEvent(itemId, newIndex) {
  console.log(itemId);
  console.log(newIndex);
};

jQuery(function($) {
    var panelList = $('#admin-app');

    panelList.sortable({
        // Only make the .panel-heading child elements support dragging.
        // Omit this to make then entire <li>...</li> draggable.
        handle: '.sort-action',
        update: function() {
            $('.panel', panelList).each(function(index, elem) {
                 var itemId = $(elem).attr('data-id'),
                     newIndex = $(elem).index();

                 // Persist the new indices.
                 sortEvent(itemId, newIndex);
            });
        }
    });
});

$(document).ready(function() {
  $('#newEvent').on('click', '.event-submit', newEvent);
  $('#editEvent').on('click', '.event-submit', saveEditedEvent);
  $('.item-actions').on('click', '.delete-event', deleteEvent);
  $('.item-actions').on('click', '.edit-event', editEvent);
});

// Add Event
function newEvent(event) {
  event.preventDefault();

  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#newEvent input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });
  $('#newEvent textarea').each(function(index, val) {
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
        location.reload();
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
  var updateObject = {
    _id: itemId,
    order: newIndex
  }
  console.log(updateObject);
  $.ajax({
    type: 'PUT',
    data: updateObject,
    url: '/sortevent',
    dataType: 'JSON'
  }).done(function( response ) {

    // Check for successful (blank) response
    if (response.msg === '') {

      // SUCCESS!
      console.log('success!');

    }
    else {

      // If something goes wrong, alert the error message that our service returned
      alert('Error: ' + response.msg);
    }
  });
};

function editEvent(event) {
  console.log(event);
  var id = $(this).attr('rel');
  console.log(id);
  $.getJSON( '/event/'+id, function(data) {
    console.log(data);
    // Set Form Values
    $('#editEvent #eventTitle').val(data.title);
    $('#editEvent #eventDescription').val(data.description);
    $('#editEvent #eventId').val(data._id);
    $('#editEvent').modal();
  });
};

function saveEditedEvent(event) {
  event.preventDefault();
  // Super basic validation - increase errorCount variable if any fields are blank
  var errorCount = 0;
  $('#editEvent input').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });
  $('#editEvent textarea').each(function(index, val) {
    if($(this).val() === '') { errorCount++; }
  });

  // Check and make sure errorCount's still at zero
  if(errorCount === 0) {

    // If it is, compile all user info into one object
    var updatedEvent = {
      '_id': $('#editEvent input#eventId').val(),
      'title': $('#editEvent input#eventTitle').val(),
      'description': $('#editEvent textarea#eventDescription').val()
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
      type: 'PUT',
      data: updatedEvent,
      url: '/editevent',
      dataType: 'JSON'
    }).done(function( response ) {

      // Check for successful (blank) response
      if (response.msg === '') {
        location.reload();
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

// Delete Event
function deleteEvent(event) {

  event.preventDefault();

  // Pop up a confirmation dialog
  var confirmation = confirm('Are you sure you want to delete this event?');

  // Check and make sure the user confirmed
  if (confirmation === true) {

    // If they did, do our delete
    $.ajax({
      type: 'DELETE',
      url: '/deleteevent/' + $(this).attr('rel')
    }).done(function( response ) {

      // Check for a successful (blank) response
      if (response.msg === '') {
      }
      else {
        alert('Error: ' + response.msg);
      }

      // Update the table
      // $('#admin-container').load(document.URL + ' #admin-app');
      location.reload();
    });
  } else {
    // If they said no to the confirm, do nothing
    return false;
  }
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

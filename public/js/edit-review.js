async function editFormHandler(event) {
  event.preventDefault();
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const taster_name = document.querySelector('#taster_name').value;

  // What will the value of is_twenty_one be if the box in the form is checked? 
  // The value of is_twenty_one will be true if the box is checked. 
  // What do we call this kind of operator?
  // We call this a ternary operator. It begins with a condition followed by a question mark and two code blocks separated by a :.
  const is_twenty_one = document.querySelector('#is_twenty_one:checked') ? true : false;

  // window.location gives us access to the URL. We then use the .split() method to access the number at the end of the URL and set that equal to id.
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  // What part of our application will handle this 'put' request?
  // The Controller will handle this 'put' request.

  const response = await fetch(`/api/review/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      description,
      taster_name,
      is_twenty_one,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // What happens if the response is ok?
  // If the response is ok, that means that the dish was updated successfully. 
  if (response.ok) {
    document.location.replace(`/review/${id}`);
  } else {
    alert('Failed to edit review');
  }
}

document.querySelector('.edit-dish-form').addEventListener('submit', editFormHandler);

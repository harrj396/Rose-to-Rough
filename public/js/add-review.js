async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const taster_name = document.querySelector('#taster_name').value;

  const is_twenty_one = document.querySelector('#is_twenty_one:checked') ? true : false;

  const response = await fetch(`/api/review`, {
    method: 'POST',
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

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to add review');
  }
}

document
  .querySelector('.new-review-form')
  .addEventListener('submit', newFormHandler);

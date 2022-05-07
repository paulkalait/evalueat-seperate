async function editFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const post_text = document.getElementById('edit-postext').value;
  const image_name = document.getElementById('output').getAttribute('src');
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  console.log(image_name)
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_text,
      image_name
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  console.log(response, "post info")

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);

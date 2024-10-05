function init() {
  renderBook();
}

function renderBook() {
  let renderContainer = document.getElementById("renderContainer");
  renderContainer.innerHTML = "";

  for (let i = 0; i < books.length; i++) {
    const book = books[i];

    renderContainer.innerHTML += `
  <div class="main_card">
    <div class="card_header">
      <h2>${book.name}</h2>
    </div>
    <div class="div_line"></div>
    <div class="card_image">
      <img src="ref/img/book.avif" alt="Book Image" />
    </div>
    <div class="div_line"></div>
    <div class="card_infos">
      <p>AUTOR: ${book.author}</p>
      <p>Erscheinug: ${book.publishedYear}</p>
      <p>Genre: ${book.genre}</p>
    </div>
    <div class="card_price">
      <p>${book.price} €</p>
      <p>
        <span id="likesCount${i}">${book.likes}</span> 
        <img id="heartImage${i}" src="${ book.liked ? "ref/icons/heart-solid.svg" : "ref/icons/heart-regular.svg"}" alt="Heart Button" onclick="bookLiked(${i})" />
      </p>
    </div>
    <div class="div_line"></div>
    <div class="card_comments">
      <div class="card_comment_box" id="bookComments${i}">
        ${renderBookComments(book.comments)}
      </div>
      <div class="card_add_comment">
        <input type="text" placeholder="Schreibe dein Kommentar" id="kommentvalue${i}" />
        <img src="ref/icons/paper-plane-solid.svg" alt="Pfeil" onclick="addCommentToJson(${i})" />
      </div>
    </div>
  </div>
`;
  }
}

function renderBookComments(comments) {
  let commentsHTML = "";

  if (!comments || comments.length == 0) {
    commentsHTML = "<p>Keine Kommentare vorhanden.</p>";
  } else {
    for (let i = 0; i < comments.length; i++) {
      commentsHTML += `<p><strong>${comments[i].name}:</strong> ${comments[i].comment}</p>`;
    }
  }

  return commentsHTML;
}

function addCommentToJson(bookIndex) {
  let commentInput = document.getElementById(`kommentvalue${bookIndex}`);
  let commentValue = commentInput.value;

  if (commentValue == "") {
    alert("Bitte gib einen Kommentar ein.");
    return;
  }

  let newComment = {
    name: "Samir",
    comment: commentValue,
  };

  books[bookIndex].comments.push(newComment);

  commentInput.value = "";

  document.getElementById(`bookComments${bookIndex}`).innerHTML = renderBookComments(books[bookIndex].comments);
}

function bookLiked(likeIndex) {
  let book = books[likeIndex];

  if (!book.liked) {
    book.likes += 1;
    book.liked = true;
    document.getElementById(`heartImage${likeIndex}`).src = "ref/icons/heart-solid.svg";
  } else {
    book.likes -= 1;
    book.liked = false;
    document.getElementById(`heartImage${likeIndex}`).src = "ref/icons/heart-regular.svg";
  }

  document.getElementById(`likesCount${likeIndex}`).textContent = book.likes;
}

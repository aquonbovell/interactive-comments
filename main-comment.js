const mainComment = (
  { user: { image: img, username: username }, createdAt, content, score },
  user
) => {
  return `
  <div class="flow" >
    <li class="bg-neutral-100 main-comment comment flow" style="--flow-spacer: .5em;">
      <div class="comment-info">
        <img src="${img.png}"/ >
        <span class="fw-semi-bold text-neutral-800">${username}</span>
        <span class="text-neutral-600">${createdAt}</span>
      </div>
      <p class="comment-content text-neutral-600 ">${content}</p>
      ${
        user === username
          ? `<div class="buttons-container">            <span class="score bg-neutral-200">              <button data-type="add" class="button text-primary-300 fw-bold">+</button>
              <span class="fw-semi-bold text-primary-600">0</span>
              <button data-type="take" class="button text-primary-300 fw-bold">-</button>
            </span>
            <div>
              <button class="button" data-type="delete">
                <img src="./images/icon-delete.svg"/>
                <span class="fw-bold text-secondary-600">Delete</span>
              </button>
              <button class="button" data-type="edit">
                <img src="./images/icon-edit.svg"/>
                <span class="fw-bold text-primary-600">Edit</span>
              </button>
            </div>
          </div>`
          : `<div class="buttons-container">
          <span class="score bg-neutral-200">
            <button data-type="add" class="button text-primary-300 fw-bold">+</button>
            <span class="fw-semi-bold text-primary-600">${score}</span>
            <button data-type="take" class="button text-primary-300 fw-bold">-</button>
          </span>
          <button class="button" data-type="reply">
            <img src="./images/icon-reply.svg"/>
            <span class="fw-bold text-primary-600">Reply</span>
          </button>
        </div>`
      }
      
      <button class="button hidden text-neutral-100 bg-primary-600 uppercase" data-type="update" >Update</button>
    </li>
    <form class="create-reply hidden bg-neutral-100" style="--flow-spacer: .5em;">
      <img src="" alt="" />
      <textarea
        id="text"
        name="reply-text"
        class="text-neutral-600"
        contenteditable="true"
        placeholder="Add a comment"
        maxlength="200"
      ></textarea>
      <button class="button text-neutral-100 bg-primary-600 uppercase" type="submit">
        Reply
      </button>
    </form>
    <dialog class="modal flow">
  <h2 class="fw-bold text-neutral-800">Delete comment
  </h2>
  <p class="text-neutral-600">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
  
  <div><button class="button text-neutral-100 bg-neutral-600 uppercase" data-type="cancel">
        No, Cancel
      </button>
  <button class="button text-neutral-100 bg-secondary-600 uppercase" data-type="delete-comment">
        Yes, Delete
      </button></div>
  </dialog>
  </div>
  
  <ul role="list" class="threads flow"></ul>`;
};

export { mainComment };

const commentsSection = document.querySelector("#comments-section");

fetch("./data.json").then((res) => {
  if (res.ok) {
    res.json().then((data) => {
      document.querySelector(".create-comment img").src =
        data.currentUser.image.png;
      const com = data.comments.map((comment) => {
        const replies = comment.replies.map((reply) => {
          return `
          <div class="flow" >
            <li class="bg-neutral-100 thread-comment comment flow">
              <div class="comment-info"> 
                <img src="${reply.user.image.png}" / >
                <span class="username fw-semi-bold text-neutral-800">${
                  reply.user.username
                }
                ${
                  data.currentUser.username === reply.user.username
                    ? '<span class="text-neutral-100 you bg-primary-600 fw-semi-bold">you</span>'
                    : ""
                }</span>
                <span class="text-neutral-600">${reply.createdAt}</span>  
              </div>
              <p class="comment-content text-neutral-600 ">
                <span class="replying fw-semi-bold text-primary-600">@${
                  reply.replyingTo
                }</span>
                <span>${reply.content}</span>
              </p>
              <div class="buttons-container">
                <span class="score bg-neutral-200">
                  <button data-type="add" class="button text-primary-300 fw-bold">+</button>
                  <span class="fw-semi-bold text-primary-600">${
                    reply.score
                  }</span>
                  <button data-type="take" class="button text-primary-300 fw-bold">-</button>
                </span>
                ${
                  data.currentUser.username === reply.user.username
                    ? '<div><button class="button" data-type="delete"><img src="./images/icon-delete.svg"/><span class="fw-bold text-secondary-600">Delete</span></button><button class="button" data-type="edit"><img src="./images/icon-edit.svg"/><span class="fw-bold text-primary-600">Edit</span></button></div>'
                    : '<button class="button" data-type="reply"><img src="./images/icon-reply.svg"/><span class="fw-bold text-primary-600">Reply</span></button>'
                }
              </div>
              <button class="button hidden text-neutral-100 bg-primary-600 uppercase" data-type="update" >Update</button>
            </li>
            <form class="create-reply hidden bg-neutral-100" style="--flow-spacer: .5em;">
              <img src="" alt="" />
              <textarea
                id="text"
                class="text-neutral-600"
                contenteditable="true"
                placeholder="Add a comment"
                maxlength="200"
              ></textarea>
              <button class="button text-neutral-100 bg-primary-600 uppercase" type="submit">
                Reply
              </button>
            </form>
          </div>`;
        });
        return `
        <div class="flow" >
          <li class="bg-neutral-100 main-comment comment flow" style="--flow-spacer: .5em;">
            <div class="comment-info">
              <img src="${comment.user.image.png}"/ >
              <span class="fw-semi-bold text-neutral-800">${
                comment.user.username
              }</span>
              <span class="text-neutral-600">${comment.createdAt}</span>
            </div>
            <p class="comment-content text-neutral-600 ">${comment.content}</p> 
            <div class="buttons-container">
              <span class="score bg-neutral-200">
                <button data-type="add" class="button text-primary-300 fw-bold">+</button>
                <span class="fw-semi-bold text-primary-600">${
                  comment.score
                }</span>
                <button data-type="take" class="button text-primary-300 fw-bold">-</button>
              </span>
              <button class="button" data-type="reply">
                <img src="./images/icon-reply.svg"/>
                <span class="fw-bold text-primary-600">Reply</span>
              </button>
            </div>
            <button class="button hidden text-neutral-100 bg-primary-600 uppercase" data-type="update" >Update</button>
          </li> 
          <form class="create-reply hidden bg-neutral-100" style="--flow-spacer: .5em;">
            <img src="" alt="" />
            <textarea
              id="text"
              class="text-neutral-600"
              contenteditable="true"
              placeholder="Add a comment"
              maxlength="200"
            ></textarea>
            <button class="button text-neutral-100 bg-primary-600 uppercase" type="submit">
              Reply
            </button>
          </form>
        </div>
        <ul role="list" class="threads flow">${replies.join("")}</ul>`;
      });
      commentsSection.innerHTML = com.join("");
      const replyBtns = document.querySelectorAll(
        ".main-comment .button[data-type='reply']"
      );
      replyBtns.forEach((replyBtn) => {
        replyBtn.addEventListener("click", () => {
          const replyBox =
            replyBtn.parentElement.parentElement.nextElementSibling;
          replyBox.classList.remove("hidden");
          replyBox.querySelector("img").src = data.currentUser.image.png;
          const inputBox = replyBox.querySelector("textarea");

          inputBox.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
          });
          function handleReplyThread(event) {
            event.preventDefault();
            event.target.parentElement.nextElementSibling.innerHTML += `
            <div class="flow">
              <li class="bg-neutral-100 thread-comment comment flow">
                <div class="comment-info">
                  <img src="${data.currentUser.image.png}" / >
                  <span class="username fw-semi-bold text-neutral-800">${
                    data.currentUser.username
                  } <span class="text-neutral-100 you bg-primary-600 fw-semi-bold">
                      you
                    </span>
                  </span>
                  <span class="text-neutral-600">just now</span>
                </div>
                <p class="comment-content text-neutral-600 ">
                  <span class="replying fw-semi-bold text-primary-600">@${event.target.previousElementSibling
                    .querySelector(".comment-info > img + span")
                    .textContent.trim()}
                  </span>
                  <span>${event.target.querySelector("textarea").value}</span>
                </p>
                <div class="buttons-container">
                  <span class="score bg-neutral-200">
                    <button data-type="add" class="button text-primary-300 fw-bold">+</button>
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
                </div>
                <button class="button hidden uppercase text-neutral-100 bg-primary-600" data-type="update" >Update</button>
              </li>
              <form class="create-reply hidden bg-neutral-100">
            <img src="" alt="" />
            <textarea
              id="text"
              class="text-neutral-600"
              contenteditable="true"
              placeholder="Add a comment"
              maxlength="200"
            ></textarea>
            <button class="button text-neutral-100 bg-primary-600 uppercase" type="submit">
              Reply
            </button>
          </form>
            </div>`;
            event.target.querySelector("textarea").value = "";
            event.target.classList.add("hidden");

            replyBox.removeEventListener("submit", handleReplyThread);
            const addBtns =
              event.target.parentElement.nextElementSibling.querySelectorAll(
                ".button[data-type='add']"
              );
            addBtns.forEach((addBtn) => {
              addBtn.addEventListener("click", () => {
                addBtn.nextElementSibling.textContent =
                  Number(addBtn.nextElementSibling.textContent) + 1;
              });
            });
            const takeBtns =
              event.target.parentElement.nextElementSibling.querySelectorAll(
                ".button[data-type='take']"
              );
            takeBtns.forEach((takeBtn) => {
              takeBtn.addEventListener("click", () => {
                takeBtn.previousElementSibling.textContent =
                  Number(takeBtn.previousElementSibling.textContent) === 0
                    ? 0
                    : Number(takeBtn.previousElementSibling.textContent) - 1;
              });
            });
            const delBtns =
              event.target.parentElement.nextElementSibling.querySelectorAll(
                ".button[data-type='delete']"
              );
            delBtns.forEach((delBtn) => {
              delBtn.addEventListener("click", () => {
                delBtn.parentElement.parentElement.parentElement.parentElement.remove();
              });
            });
            const editBtns =
              event.target.parentElement.nextElementSibling.querySelectorAll(
                ".button[data-type='edit']"
              );
            editBtns.forEach((editBtn) => {
              editBtn.addEventListener("click", () => {
                editBtn.parentElement.parentElement.previousElementSibling.children[1].contentEditable =
                  "true";
                editBtn.parentElement.parentElement.nextElementSibling.classList.remove(
                  "hidden"
                );
                editBtn.parentElement.parentElement.nextElementSibling.classList.add(
                  "editing"
                );
                editBtn.parentElement.parentElement.previousElementSibling.classList.add(
                  "flashing"
                );
                editBtn.parentElement.parentElement.previousElementSibling.scrollIntoView(
                  { behavior: "smooth" }
                );

                editBtn.parentElement.parentElement.previousElementSibling.addEventListener(
                  "animationend",
                  () => {
                    editBtn.parentElement.parentElement.previousElementSibling.classList.remove(
                      "flashing"
                    );
                  }
                );

                editBtn.parentElement.parentElement.nextElementSibling.addEventListener(
                  "click",
                  () => {
                    editBtn.parentElement.parentElement.previousElementSibling.children[1].contentEditable =
                      "false";
                    editBtn.parentElement.parentElement.nextElementSibling.classList.add(
                      "hidden"
                    );
                    editBtn.parentElement.parentElement.nextElementSibling.classList.remove(
                      "editing"
                    );
                  }
                );
              });
            });
          }
          replyBox.addEventListener("submit", handleReplyThread);
        });
      });

      const replyThreadBtns = document.querySelectorAll(
        ".thread-comment .button[data-type='reply']"
      );
      replyThreadBtns.forEach((replyThreadBtn) => {
        replyThreadBtn.addEventListener("click", () => {
          const replyBox =
            replyThreadBtn.parentElement.parentElement.nextElementSibling;
          replyBox.classList.remove("hidden");
          replyBox.querySelector("img").src = data.currentUser.image.png;
          const inputBox = replyBox.querySelector("textarea");

          inputBox.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
          });
          function handleReplyThread(event) {
            event.preventDefault();
            const child = document.createElement("div");
            child.classList.add("flow");
            child.innerHTML = `<li class="bg-neutral-100 thread-comment comment flow">
            <div class="comment-info">
              <img src="${data.currentUser.image.png}" / >
              <span class="username fw-semi-bold text-neutral-800">${
                data.currentUser.username
              } <span class="text-neutral-100 you bg-primary-600 fw-semi-bold">
                  you
                </span>
              </span>
              <span class="text-neutral-600">just now</span>
            </div>
            <p class="comment-content text-neutral-600 ">
              <span class="replying fw-semi-bold text-primary-600">@${event.target.previousElementSibling
                .querySelector(".comment-info > img + span")
                .textContent.trim()}
              </span>
              <span>${event.target.querySelector("textarea").value}</span>
            </p>
            <div class="buttons-container">
              <span class="score bg-neutral-200">
                <button data-type="add" class="button text-primary-300 fw-bold">+</button>
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
            </div>
            <button class="button hidden uppercase text-neutral-100 bg-primary-600" data-type="update" >Update</button>
          </li>
          <form class="create-reply hidden bg-neutral-100">
            <img src="" alt="" />
            <textarea
              id="text"
              class="text-neutral-600"
              contenteditable="true"
              placeholder="Add a comment"
              maxlength="200"
            ></textarea>
            <button class="button text-neutral-100 bg-primary-600 uppercase" type="submit">
              Reply
            </button>
          </form>`;
            event.target.parentElement.parentElement.appendChild(child);
            event.target.querySelector("textarea").value = "";
            event.target.classList.add("hidden");

            replyBox.removeEventListener("submit", handleReplyThread);
            const addBtns =
              event.target.parentElement.parentElement.lastChild.querySelectorAll(
                ".button[data-type='add']"
              );
            addBtns.forEach((addBtn) => {
              addBtn.addEventListener("click", () => {
                addBtn.nextElementSibling.textContent =
                  Number(addBtn.nextElementSibling.textContent) + 1;
              });
            });
            const takeBtns =
              event.target.parentElement.parentElement.lastChild.querySelectorAll(
                ".button[data-type='take']"
              );
            takeBtns.forEach((takeBtn) => {
              takeBtn.addEventListener("click", () => {
                takeBtn.previousElementSibling.textContent =
                  Number(takeBtn.previousElementSibling.textContent) === 0
                    ? 0
                    : Number(takeBtn.previousElementSibling.textContent) - 1;
              });
            });
            const delBtns =
              event.target.parentElement.parentElement.querySelectorAll(
                ".button[data-type='delete']"
              );
            delBtns.forEach((delBtn) => {
              delBtn.addEventListener("click", () => {
                delBtn.parentElement.parentElement.parentElement.parentElement.remove();
              });
            });
            const editBtns =
              event.target.parentElement.parentElement.querySelectorAll(
                ".button[data-type='edit']"
              );
            editBtns.forEach((editBtn) => {
              editBtn.addEventListener("click", () => {
                editBtn.parentElement.parentElement.previousElementSibling.children[1].contentEditable =
                  "true";
                editBtn.parentElement.parentElement.nextElementSibling.classList.remove(
                  "hidden"
                );
                editBtn.parentElement.parentElement.nextElementSibling.classList.add(
                  "editing"
                );
                editBtn.parentElement.parentElement.previousElementSibling.classList.add(
                  "flashing"
                );
                editBtn.parentElement.parentElement.previousElementSibling.scrollIntoView(
                  { behavior: "smooth" }
                );

                editBtn.parentElement.parentElement.previousElementSibling.addEventListener(
                  "animationend",
                  () => {
                    editBtn.parentElement.parentElement.previousElementSibling.classList.remove(
                      "flashing"
                    );
                  }
                );

                editBtn.parentElement.parentElement.nextElementSibling.addEventListener(
                  "click",
                  () => {
                    editBtn.parentElement.parentElement.previousElementSibling.children[1].contentEditable =
                      "false";
                    editBtn.parentElement.parentElement.nextElementSibling.classList.add(
                      "hidden"
                    );
                    editBtn.parentElement.parentElement.nextElementSibling.classList.remove(
                      "editing"
                    );
                  }
                );
              });
            });
          }
          replyBox.addEventListener("submit", handleReplyThread);
        });
      });

      const addBtns = document.querySelectorAll(".button[data-type='add']");
      addBtns.forEach((addBtn) => {
        addBtn.addEventListener("click", () => {
          addBtn.nextElementSibling.textContent =
            Number(addBtn.nextElementSibling.textContent) + 1;
        });
      });
      const takeBtns = document.querySelectorAll(".button[data-type='take']");
      takeBtns.forEach((takeBtn) => {
        takeBtn.addEventListener("click", () => {
          takeBtn.previousElementSibling.textContent =
            Number(takeBtn.previousElementSibling.textContent) === 0
              ? 0
              : Number(takeBtn.previousElementSibling.textContent) - 1;
        });
      });
      const delBtns = document.querySelectorAll(".button[data-type='delete']");
      delBtns.forEach((delBtn) => {
        delBtn.addEventListener("click", () => {
          if (
            delBtn.parentElement.parentElement.parentElement.parentElement.classList.contains(
              "main-comment"
            )
          ) {
            delBtn.parentElement.parentElement.parentElement.parentElement.nextElementSibling?.remove();
            delBtn.parentElement.parentElement.parentElement.parentElement.remove();
          } else {
            delBtn.parentElement.parentElement.parentElement.parentElement.remove();
          }
        });
      });
      const editBtns = document.querySelectorAll(".button[data-type='edit']");
      editBtns.forEach((editBtn) => {
        editBtn.addEventListener("click", () => {
          editBtn.parentElement.parentElement.previousElementSibling.children[1].contentEditable =
            "true";
          editBtn.parentElement.parentElement.nextElementSibling.classList.remove(
            "hidden"
          );
          editBtn.parentElement.parentElement.nextElementSibling.classList.add(
            "editing"
          );
          editBtn.parentElement.parentElement.previousElementSibling.classList.add(
            "flashing"
          );
          editBtn.parentElement.parentElement.previousElementSibling.scrollIntoView(
            { behavior: "smooth" }
          );

          editBtn.parentElement.parentElement.previousElementSibling.addEventListener(
            "animationend",
            () => {
              editBtn.parentElement.parentElement.previousElementSibling.classList.remove(
                "flashing"
              );
            }
          );

          editBtn.parentElement.parentElement.nextElementSibling.addEventListener(
            "click",
            () => {
              editBtn.parentElement.parentElement.previousElementSibling.children[1].contentEditable =
                "false";
              editBtn.parentElement.parentElement.nextElementSibling.classList.add(
                "hidden"
              );
              editBtn.parentElement.parentElement.nextElementSibling.classList.remove(
                "editing"
              );
            }
          );
        });
      });
    });
  }
});

const newComment = document.querySelector("#create-comment");
function handleCreateComment(event) {
  event.preventDefault();
  fetch("./data.json").then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = `<div class="flow" >
        <li class="bg-neutral-100 main-comment comment flow" style="--flow-spacer: .5em;">
          <div class="comment-info">
            <img src="${data.currentUser.image.png}" / >
            <span class="username fw-semi-bold text-neutral-800">${
              data.currentUser.username
            } <span class="text-neutral-100 you bg-primary-600 fw-semi-bold">
                you
              </span>
            </span>
            <span class="text-neutral-600">just now</span>
          </div>
          <p class="comment-content text-neutral-600 ">${event.target
            .querySelector("textarea")
            .value.trim()}</p> 
          <div class="buttons-container">
            <span class="score bg-neutral-200">
              <button data-type="add" class="button text-primary-300 fw-bold">+</button>
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
          </div>
          <button class="button hidden uppercase text-neutral-100 bg-primary-600" data-type="update" >Update</button>
        </li> 
        <form class="create-reply hidden bg-neutral-100" style="--flow-spacer: .5em;>
          <img src="" alt="" />
          <textarea
            id="text"
            class="text-neutral-600"
            contenteditable="true"
            placeholder="Add a comment"
            maxlength="200"
          ></textarea>
          <button class="button text-neutral-100 bg-primary-600 uppercase" type="submit">
            Reply
          </button>
        </form>
      </div>
      <ul role="list" class="threads flow"></ul>`;
        event.target.previousElementSibling.appendChild(wrapper.children[0]);
        event.target.previousElementSibling.appendChild(wrapper.children[0]);
        event.target.querySelector("textarea").value = "";
        const addBtns = event.target.previousElementSibling.children[
          event.target.previousElementSibling.children.length - 2
        ].querySelectorAll(".button[data-type='add']");

        addBtns.forEach((addBtn) => {
          addBtn.addEventListener("click", () => {
            addBtn.nextElementSibling.textContent =
              Number(addBtn.nextElementSibling.textContent) + 1;
          });
        });
        const takeBtns = event.target.previousElementSibling.children[
          event.target.previousElementSibling.children.length - 2
        ].querySelectorAll(".button[data-type='take']");
        takeBtns.forEach((takeBtn) => {
          takeBtn.addEventListener("click", () => {
            takeBtn.previousElementSibling.textContent =
              Number(takeBtn.previousElementSibling.textContent) === 0
                ? 0
                : Number(takeBtn.previousElementSibling.textContent) - 1;
          });
        });
        const delBtns = event.target.previousElementSibling.children[
          event.target.previousElementSibling.children.length - 2
        ].querySelectorAll(".button[data-type='delete']");

        delBtns.forEach((delBtn) => {
          delBtn.addEventListener("click", () => {
            delBtn.parentElement.parentElement.parentElement.parentElement.nextElementSibling.remove();
            delBtn.parentElement.parentElement.parentElement.parentElement.remove();
          });
        });
        const editBtns = event.target.previousElementSibling.children[
          event.target.previousElementSibling.children.length - 2
        ].querySelectorAll(".button[data-type='edit']");
        editBtns.forEach((editBtn) => {
          editBtn.addEventListener("click", () => {
            editBtn.parentElement.parentElement.previousElementSibling.contentEditable =
              "true";
            editBtn.parentElement.parentElement.nextElementSibling.classList.remove(
              "hidden"
            );
            editBtn.parentElement.parentElement.nextElementSibling.classList.add(
              "editing"
            );
            editBtn.parentElement.parentElement.previousElementSibling.classList.add(
              "flashing"
            );
            editBtn.parentElement.parentElement.previousElementSibling.scrollIntoView(
              { behavior: "smooth" }
            );

            editBtn.parentElement.parentElement.previousElementSibling.addEventListener(
              "animationend",
              () => {
                editBtn.parentElement.parentElement.previousElementSibling.classList.remove(
                  "flashing"
                );
              }
            );

            editBtn.parentElement.parentElement.nextElementSibling.addEventListener(
              "click",
              () => {
                editBtn.parentElement.parentElement.previousElementSibling.contentEditable =
                  "false";
                editBtn.parentElement.parentElement.nextElementSibling.classList.add(
                  "hidden"
                );
                editBtn.parentElement.parentElement.nextElementSibling.classList.remove(
                  "editing"
                );
              }
            );
          });
        });
      });
    }
  });
}
newComment.addEventListener("submit", handleCreateComment);

document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.getElementById("text");

  inputBox.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});

import { mainComment } from "./main-comment";
import { replyComment } from "./reply-comment";

const commentsSection = document.querySelector("#comments-section");
let user;

async function getData() {
  try {
    const req = await fetch("./data.json");

    if (!req.ok) {
      const message = `There was an error: ${req.status} ${req.statusText}`;
      throw new Error(message);
    }
    return req.json();
  } catch (error) {
    console.log(error);
  }
}

getData().then(({ comments, currentUser }) => {
  document.querySelector(".create-comment img").src = currentUser.image.png;
  user = currentUser;
  const mainComments = comments.map((comment) => {
    return mainComment(comment, currentUser.username);
  });
  commentsSection.innerHTML = mainComments.join("");
  const mainCommentsThreads = commentsSection.querySelectorAll(".threads");

  mainCommentsThreads.forEach((mainCommentsThread, index) => {
    const comment = comments[index]; // Get the corresponding comment for the current mainCommentsThread
    const threads = comment.replies.map((reply) => {
      return replyComment(reply, currentUser.username);
    });
    mainCommentsThread.innerHTML = threads.join("");
  });

  const replyBtns = document.querySelectorAll(
    ".main-comment .button[data-type='reply']"
  );

  function handleReplyThread(event) {
    event.preventDefault();
    const formText = new FormData(event.target);
    const entries = [...formText.entries()];
    if (entries[0][1]) {
      const commentReply = {
        id: 3,
        content: entries[0][1],
        createdAt: "just now",
        score: 0,
        replyingTo: event.target.previousElementSibling
          .querySelector(".comment-info > img + span")
          .textContent.trim(),
        user: {
          image: {
            png: currentUser.image.png,
            webp: currentUser.image.webp,
          },
          username: currentUser.username,
        },
      };

      event.target.parentElement.nextElementSibling.innerHTML += replyComment(
        commentReply,
        currentUser.username
      );
      event.target.querySelector("textarea").value = "";
      event.target.classList.add("hidden");

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
          const modal =
            delBtn.parentElement.parentElement.parentElement.parentElement.querySelector(
              ".modal"
            );
          modal.showModal();
          const close = modal.querySelector(
            ".button[data-type='delete-comment'"
          );
          close.addEventListener("click", () => {
            delBtn.parentElement.parentElement.parentElement.parentElement.remove();
          });
          const cancel = modal.querySelector(".button[data-type='cancel'");
          cancel.addEventListener("click", () => {
            modal.close();
          });
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
  }

  replyBtns.forEach((replyBtn) => {
    replyBtn.addEventListener("click", () => {
      const replyBox = replyBtn.parentElement.parentElement.nextElementSibling;
      replyBox.classList.remove("hidden");
      replyBox.querySelector("img").src = currentUser.image.png;
      const inputBox = replyBox.querySelector("textarea");

      inputBox.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
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
      replyBox.querySelector("img").src = currentUser.image.png;
      const inputBox = replyBox.querySelector("textarea");

      inputBox.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
      function handleReplyThread(event) {
        event.preventDefault();
        const formText = new FormData(event.target);
        const entries = [...formText.entries()];
        if (entries[0][1]) {
          const commentReply = {
            id: 3,
            content: entries[0][1],
            createdAt: "just now",
            score: 0,
            replyingTo: event.target.previousElementSibling
              .querySelector(".comment-info > img + span")
              .textContent.trim(),
            user: {
              image: {
                png: currentUser.image.png,
                webp: currentUser.image.webp,
              },
              username: currentUser.username,
            },
          };
          const wrapper = document.createElement("div");

          wrapper.innerHTML = replyComment(commentReply, currentUser.username);

          event.target.parentElement.parentElement.appendChild(
            wrapper.firstElementChild
          );

          event.target.querySelector("textarea").value = "";
          event.target.classList.add("hidden");
          replyBox.removeEventListener("submit", handleReplyThread);
          const addBtns =
            event.target.parentElement.parentElement.lastElementChild.querySelectorAll(
              ".button[data-type='add']"
            );
          addBtns.forEach((addBtn) => {
            addBtn.addEventListener("click", () => {
              addBtn.nextElementSibling.textContent =
                Number(addBtn.nextElementSibling.textContent) + 1;
            });
          });
          const takeBtns =
            event.target.parentElement.parentElement.lastElementChild.querySelectorAll(
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
            event.target.parentElement.parentElement.lastElementChild.querySelectorAll(
              ".button[data-type='delete']"
            );
          delBtns.forEach((delBtn) => {
            delBtn.addEventListener("click", () => {
              const modal =
                delBtn.parentElement.parentElement.parentElement.parentElement.querySelector(
                  ".modal"
                );
              modal.showModal();
              const close = modal.querySelector(
                ".button[data-type='delete-comment'"
              );
              close.addEventListener("click", () => {
                delBtn.parentElement.parentElement.parentElement.parentElement.remove();
              });
              const cancel = modal.querySelector(".button[data-type='cancel'");
              cancel.addEventListener("click", () => {
                modal.close();
              });
            });
          });
          const editBtns =
            event.target.parentElement.parentElement.lastElementChild.querySelectorAll(
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
        const modal =
          delBtn.parentElement.parentElement.parentElement.parentElement.querySelector(
            ".modal"
          );
        modal.showModal();
        const close = modal.querySelector(".button[data-type='delete-comment'");
        close.addEventListener("click", () => {
          delBtn.parentElement.parentElement.parentElement.parentElement.nextElementSibling?.remove();
          delBtn.parentElement.parentElement.parentElement.parentElement.remove();
        });
        const cancel = modal.querySelector(".button[data-type='cancel'");
        cancel.addEventListener("click", () => {
          modal.close();
        });
      } else {
        const modal =
          delBtn.parentElement.parentElement.parentElement.parentElement.querySelector(
            ".modal"
          );
        modal.showModal();
        const close = modal.querySelector(".button[data-type='delete-comment'");
        close.addEventListener("click", () => {
          delBtn.parentElement.parentElement.parentElement.parentElement.remove();
        });
        const cancel = modal.querySelector(".button[data-type='cancel'");
        cancel.addEventListener("click", () => {
          modal.close();
        });
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

const newComment = document.querySelector("#create-comment");

function handleCreateComment(event) {
  event.preventDefault();
  const formText = new FormData(event.target);
  const entries = [...formText.entries()];
  if (entries[0][1]) {
    const commentReply = {
      id: 3,
      content: entries[0][1],
      createdAt: "just now",
      score: 0,
      user: {
        image: {
          png: user.image.png,
          webp: user.image.webp,
        },
        username: user.username,
      },
    };
    const wrapper = document.createElement("div");
    wrapper.innerHTML = mainComment(commentReply, user?.username);
    commentsSection.appendChild(wrapper.firstElementChild);
    commentsSection.appendChild(wrapper.firstElementChild);
    event.target.querySelector("textarea").value = "";
    const newComment =
      commentsSection.children[commentsSection.children.length - 2];
    const addBtns = newComment.querySelectorAll(".button[data-type='add']");

    addBtns.forEach((addBtn) => {
      addBtn.addEventListener("click", () => {
        addBtn.nextElementSibling.textContent =
          Number(addBtn.nextElementSibling.textContent) + 1;
      });
    });
    const takeBtns = newComment.querySelectorAll(".button[data-type='take']");
    takeBtns.forEach((takeBtn) => {
      takeBtn.addEventListener("click", () => {
        takeBtn.previousElementSibling.textContent =
          Number(takeBtn.previousElementSibling.textContent) === 0
            ? 0
            : Number(takeBtn.previousElementSibling.textContent) - 1;
      });
    });
    const delBtns = newComment.querySelectorAll(".button[data-type='delete']");

    delBtns.forEach((delBtn) => {
      delBtn.addEventListener("click", () => {
        const modal =
          delBtn.parentElement.parentElement.parentElement.parentElement.querySelector(
            ".modal"
          );
        modal.showModal();
        const close = modal.querySelector(".button[data-type='delete-comment'");
        close.addEventListener("click", () => {
          delBtn.parentElement.parentElement.parentElement.parentElement.nextElementSibling.remove();
          delBtn.parentElement.parentElement.parentElement.parentElement.remove();
        });
        const cancel = modal.querySelector(".button[data-type='cancel'");
        cancel.addEventListener("click", () => {
          modal.close();
        });
      });
    });
    const editBtns = newComment.querySelectorAll(".button[data-type='edit']");
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
  }
}

newComment.addEventListener("submit", handleCreateComment);

document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.getElementById("text");

  inputBox.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
});

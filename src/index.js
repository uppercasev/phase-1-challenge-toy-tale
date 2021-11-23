let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
//Assignment code below.
const toyContainer = document.getElementById('toy-collection');
const addForm = document.querySelector('.add-toy-form');
const newName = document.querySelector('input[name=name]');
const newImg = document.querySelector('input[name=image]');

const getData = async function(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

const createToyCard = function(toy) {
  let toyCard = document.createElement('div');
  let toyName = document.createElement('h2');
  let toyImg = document.createElement('img');
  let toyLikes = document.createElement('p');
  let likeButton = document.createElement('button');
  toyCard.className = "card";
  toyName.innerHTML = toy.name;
  toyImg.setAttribute('src', toy.image);
  toyImg.className = "toy-avatar";
  toyLikes.innerHTML = `${toy.likes} Likes`;
  likeButton.className = "like-btn";
  likeButton.id = toy.id;
  likeButton.innerHTML = "Like <3";
  likeButton.addEventListener("click", function() {
    toy.likes++;
    let patchObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        "likes": toy.likes,
      })
    };
    fetch(`http://localhost:3000/toys/${toy.id}`, patchObj)
    .then(function() {
      toyLikes.innerHTML = `${toy.likes} Likes`;
    });
  })
  toyCard.append(toyName, toyImg, toyLikes, likeButton);
  return toyCard;
}

const createNewToy = function() {
  let formData = {
    name: newName.value,
    image: newImg.value,
    likes: 0
  };
  let postObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };
  fetch("http://localhost:3000/toys", postObj)
  .then(function() {
    let card = createToyCard(formData);
    toyContainer.appendChild(card);
  });
}

window.addEventListener('DOMContentLoaded', async function() {
  const allToys = await getData("http://localhost:3000/toys");
  allToys.forEach(function(toy) {
    let card = createToyCard(toy);
    toyContainer.appendChild(card);
  });
});

addForm.addEventListener('submit', function(event) {
  event.preventDefault();
  createNewToy();
});

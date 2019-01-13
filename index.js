document.addEventListener("DOMContentLoaded", () => {
  let menuNode = document.getElementById("burger-menu")
  fetch("http://localhost:3000/burgers")
  .then(res => res.json())
  .then(body => slapBurgers(menuNode, body))

  delegateCustomBurger()
})

function delegateCustomBurger() {
  let formNode = document.querySelector("#custom-burger")
  formNode.addEventListener("submit", e => {
    e.preventDefault()

    let burger = {
      name: e.target[0].value,
      description: e.target[1].value,
      image: e.target[2].value
    }

    fetch(
      `http://localhost:3000/burgers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(burger)
    })
    .then(res => res.json())
    .then(body => {
      let menuNode = document.getElementById("burger-menu")
      menuNode.append(burgerFormat(body))
    })
  })
}

function slapBurgers(node, burgerArray) {
  burgerArray.forEach(burger => node.append(burgerFormat(burger)))
}

function burgerFormat(burger) {
  let e = document.createElement("div")
  e.className = "burger"
  e.innerHTML =
    `<h3 class="burger_title">${burger.name}</h3>
      <img src="${burger.image}">
      <p class="burger_description">
        ${burger.description}
      </p>
      <button onclick="addOrder(${burger.id})" class="button">Add to Order</button>`
  return e
}

function addOrder(id) {
  fetch(`http://localhost:3000/burgers/${id}`)
  .then(res => res.json())
  .then(body => addToOrder(body))
}

function addToOrder(burger) {
  let orderNode = document.getElementById("order-list")
  let e = document.createElement("li")
  e.innerText = burger.name
  orderNode.append(e)
}

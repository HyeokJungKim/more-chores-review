document.addEventListener("DOMContentLoaded", () => {
  const list = document.querySelector("#chore-list")

//index & show (R)
  fetch("http://localhost:3000/chores")
  .then(res => res.json())
  .then((json) => {
    json.forEach(renderChore)
  })

  const choreForm = document.querySelector("#new-chore-form")
  // Create (C)
  choreForm.addEventListener("submit", (event) => {
    event.preventDefault()
    console.log(event.target.children);
    const newChoreTitle = document.getElementById('title')
    const newChoreDuration = document.getElementById('duration')
    const newChorePriority = document.getElementById('priority')
    fetch("http://localhost:3000/chores",{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({title: newChoreTitle.value,
        duration: newChoreDuration.value,
        priority: newChorePriority.value})
    })
    .then(res => res.json())
    .then((chore) => {
      renderChore(chore)
      newChoreTitle.value = ""
      newChoreDuration.value = ""
      newChorePriority.value = ""
    })
  })
  //How it gets shown (R)
  const renderChore = (chore) => {
    // console.log(chore);
    const choreDiv = document.createElement('div')
    const deleteButton = document.createElement("button")
    const choreName = document.createElement('h3')
    const choreDuration = document.createElement('p')
    // const priorityForm = document.createElement('form')
    const priorityField = document.createElement('input')

    deleteButton.className = 'delete-button'
    deleteButton.innerText = 'x'
    choreDiv.className = 'chore-card'
    choreName.innerText = chore.title
    choreDiv.dataset.id = chore.id
    choreDuration.innerText = chore.duration
    priorityField.value = chore.priority

    // priorityForm.append(priorityField)
    choreDiv.append(deleteButton, choreName, choreDuration, priorityField)
    list.appendChild(choreDiv)

    deleteButton.addEventListener("click", deleteChore)
    priorityField.addEventListener("blur", editChore)
  }
  //Delete Action (D)
  function deleteChore(event){
    const choreId = event.target.parentNode.dataset.id
    event.target.parentNode.remove()
    fetch(`http://localhost:3000/chores/${choreId}`, {
      method: "DELETE"
    })
    // .then(res => {
    //   if(res.ok){
    // event.target.parentNode.remove()
    //   }
    // })
  }
  //Update Action (U)
  () => {

  }
  function editChore(event){
    console.log("hit");
    // event.preventDefault()
    const choreId = event.target.parentNode.dataset.id
    fetch(`http://localhost:3000/chores/${choreId}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({priority: event.target.value})
    })
    // .then(res => res.json())
    // .then(json => console.log(json))
  }
})

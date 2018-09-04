const API = "http://localhost:3000/chores"
class ChoreAdapter{
  static getChores(){
    return fetch(API)
    .then(res => {
      return res.json()
    })
  }

  static createNewChore(data){
    return fetch(API,{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(data)
    })
  }

  static editChore(id, data){
    return fetch(`${API}/${id}`,{
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(data)
    })
  }
}

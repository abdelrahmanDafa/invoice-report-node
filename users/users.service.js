

const findUsers = ()=>{
  return genUsers()
}
const genUsers= ()=>{
    let users = []

    for(let i=0; i<20 ; i++){
        let iterator = i+1
        let user = {
            id:iterator,
            name:`${iterator} - name`,
            email:`${iterator}-ex@email.com`,
            username:`${iterator} - username`,
        }
        users.push(user)
    }
    return users
}

module.exports = {
    findUsers
}
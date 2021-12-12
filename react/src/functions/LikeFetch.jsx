
export const LikeListFetch = async() =>{
    const res = await fetch(`http://localhost:5050/likey`)
    const list = await res.json()
    return list
}

// wit like Fetch
export const WitLikeFetch =async(user_id, wit)=>{
    const witId = wit.id
    const fetch_option = {
      method : "POST",
      headers : {
        "Content-Type": "application/json",
      },
    }
  
    const res = await fetch(`http://localhost:5050/likey/${user_id}/${witId}`,fetch_option)
  }
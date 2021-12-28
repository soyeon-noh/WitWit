const fetch_option = (user)=> {
    return {
        method:"POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify(user)
    }
}

export const LoginFetch =async(user) =>{
    const option = fetch_option(user);
    const res = await fetch(`http://localhost:5050/users/login`, option);
    
    return res
}

export const JoginFetch =async(user) =>{
    const option = fetch_option(user);
    await fetch(`http://localhost:5050/users/join`, option);
}



const fetch1 = () =>{
    fetch(인수,인수2)
}

const fetch2 =() =>{
    fetch(인수3, 인수4)
}

<WitView fetchFunc={fetch1}></WitView>

function WithVIew ({fetch}) {

    const list = fetch()
}
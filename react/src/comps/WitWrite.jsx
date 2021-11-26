import moment from 'moment';
import React from 'react'
import { useWitContext } from '../context/WitContextProvider'
import "../css/WitWrite.css"

const WitWrite= () =>{

    const { wit, setWit, witList, setWitList } = useWitContext;

    // wit 내용 입력했을 때
    const onChangeHandler =(e) =>{
        const wit_text = e.target.value;
        setWit({...wit, text:wit_text})
    }

    const witInsert = async() =>{
        
        await setWitList([...witList, wit]);

        const fetch_option = {
            method:"POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(wit),
        }

        await fetch("http://localhost:5050/", fetch_option)
    }


    return (
        <div>
            
            <div className="wit_input_box">
                <input type="text" maxLength="512" 
                    onChange={onChangeHandler}
                    className="write" placeholder="당신의 생각을 wit하세요"/>
                <button onClick={witInsert}>위트하기</button>
            </div>

        </div>
    )
}

export default WitWrite

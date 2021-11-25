import React from 'react'
import "../css/WitWrite.css"

function WitWrite() {
    return (
        <div>
            
            <div className="wit_input_box">
                <input type="text" maxLength="512" className="write" placeholder="당신의 생각을 wit하세요"/>
                <button>위트하기</button>
            </div>

        </div>
    )
}

export default WitWrite

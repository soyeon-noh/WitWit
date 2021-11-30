import moment from 'moment';
import React from 'react'
import { useWitContext } from '../../context/WitContextProvider';

import "../../css/MyRoomWits.css"

function RoomWitItem() {
    
    const {witList} = useWitContext(); 

    return  witList.map((wit)=>{

        const createAt = wit.createdDate + " " + wit.createdTime

        return (
            <div className="room_wits">
                <div className="room_wit_fromNow">{moment( Date.parse(createAt) ).fromNow()}</div>
                <div className="room_wit_text">{wit.text}</div>
            </div>
        )
    })
}

export default RoomWitItem

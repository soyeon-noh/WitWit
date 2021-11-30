import React from 'react'
import { Outlet } from 'react-router'
import WitContextProvider from '../../context/WitContextProvider'

import "../../css/MyRoom.css"
import FolderBox from './FolderBox'
import RoomWitItem from './RoomWitItem'

function MyRoom() {
    return (
        // <Outlet/>
        <div className="myRoomBox">
            <div className="idCard">유저 프로필 정보 들어감</div>
            <div className="userWitList">
                <WitContextProvider>
                    <RoomWitItem/>
                </WitContextProvider>
            </div>
            <div className="folderBox">
                <FolderBox/>
                <div className="windowUnder"></div>
            </div>
        </div>
    )
}

export default MyRoom

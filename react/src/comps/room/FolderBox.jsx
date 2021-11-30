import React from 'react'

import "../../css/MyRoomFolder.css"
import FolderIcon from "../../static/img/folder-icon.png"

function FolderBox() {
    return (
        <>  
            <div className="folder">
                <div className="folder-icon">
                    <img src={FolderIcon}/>
                </div>
                <span>폴더이름</span>
            </div>
            <div className="folder">
                <div className="folder-icon">
                    <img src={FolderIcon}/>
                </div>
                <span>폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름</span>
            </div>
            <div className="folder">
                <div className="folder-icon">
                    <img src={FolderIcon}/>
                </div>
                <span>폴더이름폴더이름폴더이름폴더이름</span>
            </div>
            <div className="folder">
                <div className="folder-icon">
                    <img src={FolderIcon}/>
                </div>
                <span>폴폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름폴더이름</span>
            </div>
            <div className="folder">
                <div className="folder-icon">
                    <img src={FolderIcon}/>
                </div>
                <span>폴더이름</span>
            </div>
            
        </>
    )
}

export default FolderBox

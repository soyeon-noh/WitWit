import React from 'react'
import "../../css/WitItem.css"
import { useWitContext } from "../../context/WitContextProvider"

import profile from "../../static/img/profile-basic.png"
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';


import moment from "moment";
import "moment/locale/ko";

const WitItem = () => {

    const {witList} = useWitContext(); 

    return  witList.map((wit)=>{

        const createAt = wit.createdDate + " " + wit.createdTime

        return (
            <div className="wits">

                <span className="wit_profile">
                    <img src={profile} className="wit_profile"/>
                </span>

                <span className="wit_userNick">{wit.userName}</span>
                <span className="wit_userid">{wit.userId}</span>
                <span className="wit_fromNow">{moment( Date.parse(createAt) ).fromNow()}</span>
                {/* <span className="wit_fromNow">{moment(Date.parse(wit.createdDate,wit.createdTime)).fromNow()}, {wit.createdDate}, {wit.createdTime}</span> */}
                <div className="wit_text">{wit.text}</div>
                <div className="icon_box">
                    <span><BookmarkBorderRoundedIcon fontSize=""/></span>
                    <span><BorderColorRoundedIcon fontSize=""/></span>
                    <span><FavoriteBorderRoundedIcon fontSize=""/></span>
                </div>
            </div>
        )
    })
}

export default WitItem

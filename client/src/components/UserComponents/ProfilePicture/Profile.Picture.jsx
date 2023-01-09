import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core"

export default function ProfilePicture({handleShowUserList}) {

    const profile_picture_url = useSelector(state => state.loggedUser.profile_pic)
    const [profilePicture, setProfilePicture] = useState(null);
    useEffect(() => {
        const img = new window.Image();
        img.src = profile_picture_url;
        img.onload = () => setProfilePicture(img.src);
    }, [profile_picture_url]);
    return (
        <div className="nav-bar-accountIcon">
                <Avatar
                src={profilePicture}
                onClick={(e) => handleShowUserList(e)}
                imgProps={{ referrerPolicy: 'no-referrer' }}
            />
        </div>
    )
}
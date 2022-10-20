import React from "react"
import styles from "./Github.module.scss"
import {IUser} from "../models/IUser"

export const User: React.FC<UserPropsType> = ({user}) => {
    return (
        <>
            <div className={styles.avatarMin}>
                <img src={user.avatar_url} alt="avatar"/>
            </div>
            <h4 className={styles.userLogin}>{user.login}</h4>
        </>
    )
}

type UserPropsType = {
    user: IUser;
}
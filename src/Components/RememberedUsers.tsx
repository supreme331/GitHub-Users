import React, {useContext} from "react";
import {Context} from "../Context";
import styles from "./Github.module.scss";

export const RememberedUsers = () => {
    const {
        rememberedUsers, setSelectedUser, setIsFollowersRequested, setIsFollowingRequested,
        setIsRepositoriesRequested, selectedUser, requestErrorMessage
    } = useContext(Context)
    return (
        <div className={`${styles.rememberedBlock} ${styles.scroll}`}>
            <h2 className={styles.title}>Remembered users</h2>
            {requestErrorMessage ? <div className={styles.error}>{requestErrorMessage}</div> :
                rememberedUsers && <ul className={styles.usersList}>
                    {
                        rememberedUsers.map(u => <li
                            className={`${styles.user} ${selectedUser?.id === u.id ? styles.selected : ''}`} key={u.id}
                            onClick={() => {
                                setSelectedUser(u)
                                setIsFollowersRequested(false)
                                setIsFollowingRequested(false)
                                setIsRepositoriesRequested(false)
                            }}>
                            <div className={styles.avatarMin}>
                                <img src={u.avatar_url} alt="avatar"/>
                            </div>
                            <span className={styles.userLogin}>{u.login}</span>
                        </li>)
                    }
                </ul>
            }
        </div>
    )
}
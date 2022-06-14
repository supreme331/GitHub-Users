import styles from "./Github.module.scss";
import React, {useContext} from "react";
import {Context} from "../Context";

export const SearchList = () => {
    const {
        users, selectedUser, setSelectedUser, setIsFollowersRequested, setIsFollowingRequested,
        setIsRepositoriesRequested, setIsFetchingUsers, isLoadMoreUsersBtnActive, setIsUserRemembered
    } = useContext(Context)

    return (
        <div className={`${styles.searchBlock} ${styles.scroll}`}>
            {users.length > 0 ? <h2 className={styles.title}>Found users</h2> :
                <h2 className={styles.title}>Enter user login in search input</h2>}
            <ul className={styles.usersList}>
                {users
                    .map((u) => <li className={`${styles.user} ${selectedUser?.id === u.id ? styles.selected : ''}`}
                                    key={u.id}
                                    onClick={() => {
                                        setSelectedUser(u)
                                        setIsUserRemembered(false)
                                        setIsFollowersRequested(false)
                                        setIsFollowingRequested(false)
                                        setIsRepositoriesRequested(false)
                                    }}>
                        <div className={styles.avatarMin}>
                            <img src={u.avatar_url} alt="avatar"/>
                        </div>
                        <span className={styles.userLogin}>{u.login}</span>
                    </li>)}
            </ul>
            {
                isLoadMoreUsersBtnActive &&
                <div className={styles.loadMoreBtn} onClick={() => setIsFetchingUsers(true)}>Load more</div>
            }
        </div>
    )
}
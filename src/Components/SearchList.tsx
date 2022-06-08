import styles from "./Github.module.scss";
import React, {useContext, useEffect, useState} from "react";
import {Context} from "../Context";
import {SearchResult, SearchUsertype} from "./Github";
import axios from "axios";

export const SearchList = () => {
    const {
        users, setUsers, selectedUser, setSelectedUser, searchTerm, setIsFollowersRequested,
        setIsFollowingRequested, resetTempSearch, setIsRepositoriesRequested, setFetchingUsers, isLoadMoreUsersBtnActive
    } = useContext(Context)


    // useEffect(() => {
    //     console.log('Sync tab title')
    //     if (selectedUser) {
    //         document.title = selectedUser.login
    //     }
    // }, [selectedUser])

    return (
        <div className={!selectedUser ? styles.searchBlock : styles.searchBlockMin}>
            {users.length > 0 ? <h2 className={styles.title}>Found users</h2> : <h2 className={styles.title}>Enter user login in search input</h2>}

            <ul className={styles.usersList}>
                {users
                    .map((u) => <li className={`${styles.user} ${selectedUser?.id === u.id ? styles.selected : ''}`}
                                    key={u.id}
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
                    </li>)}
            </ul>
            {
                isLoadMoreUsersBtnActive && <div className={styles.loadMoreBtn} onClick={() => setFetchingUsers(true)}>Load more</div>
            }
        </div>
    )
}
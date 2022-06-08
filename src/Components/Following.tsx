import React, {useContext, useEffect, useState} from "react";
import {SearchUsertype} from "./Github";
import axios from "axios";
import {Context} from "../Context";
import styles from "./Github.module.scss";

export const Following = () => {
    const {selectedUser, setSelectedUser, isFollowingRequested, setIsFollowingRequested, setFetchingFollowing, fetchingFollowing, followingPagesCount} = useContext(Context)
    const [following, setFollowing] = useState<SearchUsertype[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLoadMoreBtnActive, setIsLoadMoreBtnActive] = useState<boolean>(true)

    useEffect(() => {
        console.log('Sync user details')
        // @ts-ignore
        if(fetchingFollowing && currentPage <= followingPagesCount) {
            axios
                .get<SearchUsertype[]>(`https://api.github.com/users/${selectedUser?.login}/following?page=${currentPage}&per_page=18`)
                .then(res => {
                    setFollowing([...following, ...res.data])
                    setCurrentPage(currentPage + 1)
                })
                .finally(() => setFetchingFollowing(false))
        }
        // @ts-ignore
        if (fetchingFollowing && currentPage === followingPagesCount) {
            setIsLoadMoreBtnActive(false)
        }
    }, [fetchingFollowing])
    return (
        <div className={styles.additional}>
            {!!isFollowingRequested ? <div>
                <h2 className={styles.title}>Following</h2>
                <ul className={styles.usersList}>
                    {following
                        .map(f => <li className={`${styles.user} ${selectedUser?.id === f.id ? styles.selected : ''}`} key={f.id}
                                      onClick={() => {
                                          setSelectedUser(f)
                                          setIsFollowingRequested(false)
                                      }}>
                            <div className={styles.avatarMin}>
                                <img src={f.avatar_url} alt="avatar"/>
                            </div>
                            <h4 className={styles.userLogin}>{f.login}</h4>
                        </li>)}
                </ul>
                {
                    isLoadMoreBtnActive && <div className={styles.loadMoreBtn} onClick={() => setFetchingFollowing(true)}>Load more</div>
                }


            </div> : null}
        </div>
    )
}
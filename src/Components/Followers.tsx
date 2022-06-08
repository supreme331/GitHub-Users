import React, {useContext, useEffect, useState} from "react";
import {SearchUsertype} from "./Github";
import axios from "axios";
import {Context} from "../Context";
import styles from "./Github.module.scss";

export const Followers = () => {
    const {selectedUser, setSelectedUser,
        isFollowersRequested, setIsFollowersRequested,
        fetchingFollowers, setFetchingFollowers, followersPagesCount
    } = useContext(Context)
    const [followers, setFollowers] = useState<SearchUsertype[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [isLoadMoreBtnActive, setIsLoadMoreBtnActive] = useState<boolean>(true)
    // const scrollHandler = (e: any) => {
    //     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) {
    //         setFetchingFollowers(true)
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener('scroll', scrollHandler)
    //     return function () {
    //         document.removeEventListener('scroll', scrollHandler)
    //     }
    // }, [])

    useEffect(() => {
        // @ts-ignore
        if(fetchingFollowers && currentPage <= followersPagesCount) {
        axios
            .get<SearchUsertype[]>(`https://api.github.com/users/${selectedUser?.login}/followers?page=${currentPage}&per_page=18`)
            .then(res => {
                setFollowers([...followers, ...res.data])
                setCurrentPage(currentPage + 1)
            })
            .finally(() => setFetchingFollowers(false))
        }
        // @ts-ignore
        if (fetchingFollowers && currentPage === followersPagesCount) {
            setIsLoadMoreBtnActive(false)
        }
    }, [fetchingFollowers])
    return (
        <div className={styles.additional}>
            {!!isFollowersRequested ? <div className={styles.additionalContent}>
                <h2 className={styles.title}>Followers</h2>
                <ul className={styles.usersList}>
                    {followers
                        .map(f => <li className={`${styles.user} ${selectedUser?.id === f.id ? styles.selected : ''}`} key={f.id}
                                      onClick={() => {
                                          setSelectedUser(f)
                                          setIsFollowersRequested(false)
                                      }}>
                            <div className={styles.avatarMin}>
                                <img src={f.avatar_url} alt="avatar"/>
                            </div>
                            <h4 className={styles.userLogin}>{f.login}</h4>
                        </li>)}
                </ul>
                {
                    isLoadMoreBtnActive && <div className={styles.loadMoreBtn} onClick={() => setFetchingFollowers(true)}>Load more</div>
                }
            </div> : null}
        </div>
    )
}
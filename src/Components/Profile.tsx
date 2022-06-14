import styles from "./Github.module.scss";
import React, {useEffect, useState, useContext} from "react";
import {UserType} from "./Github";
import axios from "axios";
import {Context} from "../Context";
import {Additional} from "./Additional";

export const Profile = () => {
    const {
        selectedUser, setSelectedUser, isFollowersRequested, setIsFollowersRequested,
        isFollowingRequested, setIsFollowingRequested, setIsRepositoriesRequested,
        setFetchingRepositories, calculatePagesCount, setFetchingFollowing, setFetchingFollowers,
        isUserRemembered, setIsUserRemembered, rememberedUsers
    } = useContext(Context)

    const [userDetails, setUserDetails] = useState<UserType | null>(null)

    const rememberUser = (userId: number, userLogin: string) => {
        localStorage.setItem((userId).toString(), userLogin)
        setIsUserRemembered(true)
    }
    const removeUser = (userId: number) => {
        localStorage.removeItem((userId).toString())
        setIsUserRemembered(false)
    }
    useEffect(() => {
        setIsUserRemembered(false)
        if (selectedUser) {
            document.title = selectedUser.login
            axios
                .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                    calculatePagesCount(res.data.followers, res.data.following, res.data.public_repos)
                })
            rememberedUsers.map(u => u.login === selectedUser.login && setIsUserRemembered(true))
        }
    }, [selectedUser])
    return (<div className={styles.userProfile}>
            {!!userDetails && <div className={styles.profileContent}>
                <div className={styles.avatarBlock}>
                    <div className={`${styles.avatar + ' ' + styles._ibg}`}>
                        <img src={userDetails.avatar_url} alt=""/>
                    </div>
                    <div className={styles.buttons}>
                        <a className={styles.button} target='_blank' rel='noreferrer' href={`https://github.com/${userDetails.login}`}>
                            Open profile in GitHub
                        </a>
                        {
                            isUserRemembered ? <div className={styles.button} onClick={() => {
                                    removeUser(userDetails.id)
                                }}>Remove from remembered</div>
                                : <div className={styles.button} onClick={() => {
                                    rememberUser(userDetails.id, userDetails.login)
                                }}>Remember user</div>
                        }
                    </div>
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.profileLogin}>{userDetails.login}</div>
                    {
                        userDetails.name && <div><span>Name:</span> {userDetails.name}</div>
                    }
                    {
                        userDetails.company && <div><span>Company:</span> {userDetails.company}</div>
                    }
                    {
                        userDetails.location && <div><span>Location:</span> {userDetails.location}</div>
                    }
                    {
                        userDetails.twitter_username &&
                        <div><span>Twitter user name:</span> {userDetails.twitter_username}</div>
                    }
                    {
                        userDetails.bio && <div><span>Bio:</span> {userDetails.bio}</div>
                    }
                    {
                        userDetails.blog &&
                        <a className={styles.profileInfoItem} target='_blank' rel='noreferrer' href={userDetails.blog}>Blog</a>
                    }
                    <div className={styles.profileInfoItem} onClick={() => {
                        setIsFollowingRequested(false)
                        setIsRepositoriesRequested(false)
                        if (userDetails.followers > 0) {
                            setFetchingFollowers(true)
                            setIsFollowersRequested(!isFollowersRequested)
                        }
                    }}>Followers: {userDetails.followers}</div>
                    <div className={styles.profileInfoItem} onClick={() => {
                        setIsFollowersRequested(false)
                        setIsRepositoriesRequested(false)
                        if (userDetails.following > 0) {
                            setFetchingFollowing(true)
                            setIsFollowingRequested(!isFollowingRequested)
                        }
                    }}>Following: {userDetails.following}</div>
                    <div className={styles.profileInfoItem} onClick={() => {
                        setIsFollowersRequested(false)
                        setIsFollowingRequested(false)
                        setIsRepositoriesRequested(true)
                        if (userDetails.public_repos > 0) {
                            setFetchingRepositories(true)
                        }
                    }}>Repositories: {userDetails.public_repos}</div>
                </div>
                <div className={styles.closeUserProfileBtn} onClick={() => {
                    setSelectedUser(null)
                }}>X
                </div>
            </div>}
            <Additional/>
        </div>
    )
}
import styles from "./Github.module.scss";
import React, {useEffect, useState, useContext} from "react";
import { UserType} from "./Github";
import axios from "axios";
import {Context} from "../Context";
import {Additional} from "./Additional";

export const Profile = () => {
    const [userDetails, setUserDetails] = useState<UserType | null>(null)
    const [pagesCount, setPagesCount] = useState<number>()
    const {selectedUser, setSelectedUser, isFollowersRequested, setIsFollowersRequested,
        isFollowingRequested, setIsFollowingRequested,
        isRepositoriesRequested, setIsRepositoriesRequested,
        setFetchingRepositories, calculatePagesCount, setFetchingFollowing, setFetchingFollowers
        } = useContext(Context)

    useEffect(() => {
        console.log('Sync user details')
        if(selectedUser) {
            axios
                .get<UserType>(`https://api.github.com/users/${selectedUser.login}`)
                .then(res => {
                    setUserDetails(res.data)
                    calculatePagesCount(res.data.followers, res.data.following, res.data.public_repos)
                })
        }
    }, [selectedUser])
    return (
        <div className={styles.userProfile}>
            {!!userDetails && <div className={styles.profileContent}>
                <div>
                    <div className={`${styles.avatar +' ' + styles._ibg}`}>
                        <img src={userDetails.avatar_url} alt=""/>
                    </div>
                    <a className={styles.button} target={'_blank'} href={`https://github.com/${userDetails.login}`}>
                        Open profile in GitHub
                    </a>
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
                        userDetails.twitter_username && <div><span>Twitter user name:</span> {userDetails.twitter_username}</div>
                    }
                    {
                        userDetails.bio && <div><span>Bio:</span> {userDetails.bio}</div>
                    }
                    {
                        userDetails.blog && <a className={styles.profileInfoItem} target={'_blank'} href={userDetails.blog}>Blog</a>
                    }
                    <div className={styles.profileInfoItem} onClick={() => {
                        setIsFollowingRequested(false)
                        setIsRepositoriesRequested(false)
                        // if(isFollowersRequested) {
                        //     calculatePagesCount(userDetails.followers)
                        // }
                        if(userDetails.followers > 0) {
                            setFetchingFollowers(true)
                            setIsFollowersRequested(!isFollowersRequested)
                        }
                    }}>Followers: {userDetails.followers}</div>
                    <div className={styles.profileInfoItem} onClick={() => {
                        setIsFollowersRequested(false)
                        setIsRepositoriesRequested(false)

                        // if(isFollowingRequested) {
                        //     calculatePagesCount(userDetails.following)
                        // }
                        if(userDetails.following > 0) {
                            setFetchingFollowing(true)
                            setIsFollowingRequested(!isFollowingRequested)
                        }
                    }}>Following: {userDetails.following}</div>
                    <div className={styles.profileInfoItem} onClick={() => {
                        setIsFollowersRequested(false)
                        setIsFollowingRequested(false)
                        setIsRepositoriesRequested(true)
                        // if(isRepositoriesRequested) {
                        //     calculatePagesCount(userDetails.public_repos)
                        // }
                        if(userDetails.public_repos > 0) {
                            setFetchingRepositories(true)
                                                    }
                    }}>Repositories: {userDetails.public_repos}</div>

                </div>
                <div className={styles.closeUserProfile} onClick={() => {setSelectedUser(null)}}>Close</div>
            </div>}
            <Additional />
        </div>
    )
}
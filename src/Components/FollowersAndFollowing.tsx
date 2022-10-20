import React, {useEffect, useState} from "react"
import styles from "./Github.module.scss"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {fetchFollowersUsers, fetchFollowingUsers} from "../store/reducers/UsersSlice"
import {IUser} from "../models/IUser"
import {User} from "./User"

export const FollowersAndFollowing: React.FC<FollowersAndFollowingPropsType> = ({
                                                                                    setSelectedUserLogin,
                                                                                    selectedUserLogin,
                                                                                    additionalComponentName
                                                                                }) => {

    const dispatch = useAppDispatch()
    const {followersUsers, followingUsers, selectedUser} = useAppSelector(state => state.usersReducer)
    const [users, setUsers] = useState<IUser[] | null>(null)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [toggleReset, setToggleReset] = useState<boolean>(false)

    const loadFollowers = () => {
        if (selectedUser) {
            dispatch(fetchFollowersUsers({login: selectedUser.login, currentPage}))
        }
    }

    const loadFollowing = () => {
        if (selectedUser) {
            dispatch(fetchFollowingUsers({login: selectedUser.login, currentPage}))
        }
    }

    const resetComponent = () => {
        setCurrentPage(1)
        dispatch(fetchFollowersUsers(null))
        dispatch(fetchFollowingUsers(null))
        setToggleReset(!toggleReset)
    }

    useEffect(() => {
        resetComponent()
    }, [selectedUserLogin])

    useEffect(() => {
        resetComponent()

    }, [additionalComponentName])

    useEffect(() => {
        if (additionalComponentName === 'followers') {
            loadFollowers()
            setCurrentPage(currentPage + 1)
        }
        if (additionalComponentName === 'following') {
            loadFollowing()
            setCurrentPage(currentPage + 1)
        }
    }, [toggleReset])

    useEffect(() => {
        if (additionalComponentName === 'followers') {
            setUsers(followersUsers)
        }
        if (additionalComponentName === 'following') {
            setUsers(followingUsers)
        }
    }, [followersUsers, followingUsers])

    return (
        <div className={styles.additional}>
            {users ? <div className={styles.additionalContent}>
                <h2 className={styles.title}>
                    {
                        additionalComponentName === 'followers' ? 'Followers'
                            : additionalComponentName === 'following' ? 'Following' : ''
                    }
                </h2>
                <ul className={styles.usersList}>
                    {users
                        .map(user => <li
                            className={`${styles.user} ${selectedUser?.id === user.id ? styles.selected : ''}`}
                            key={user.id}
                            onClick={() => {
                                setSelectedUserLogin(user.login)
                            }}>
                            <User user={user}/>
                        </li>)}
                </ul>
                <div className={styles.loadMoreBtn} onClick={() => {
                    if (additionalComponentName === 'followers') {
                        setCurrentPage(currentPage + 1)
                        loadFollowers()
                    }
                    if (additionalComponentName === 'following') {
                        setCurrentPage(currentPage + 1)
                        loadFollowing()
                    }
                }
                }>Load more</div>
            </div> : null}
        </div>
    )
}

type FollowersAndFollowingPropsType = {
    setSelectedUserLogin: (login: string) => void
    selectedUserLogin: string
    additionalComponentName: string
}
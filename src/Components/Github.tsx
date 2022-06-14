import React, {useEffect, useState} from "react";
import styles from "./Github.module.scss"
import {Header} from "./Header";
import {SearchList} from "./SearchList";
import {Profile} from "./Profile";
import {Context} from "../Context";
import axios from "axios";
import {RememberedUsers} from "./RememberedUsers";

export type SearchUsertype = {
    login: string
    id: number
    avatar_url: string
    public_repos: number
}
export type SearchResult = {
    items: SearchUsertype[]
    total_count: number
}
export type UserType = {
    login: string
    id: number
    avatar_url: string
    followers: number
    following: number
    public_repos: number
    name: string | null
    company: string | null
    location: string | null
    twitter_username: string | null
    bio: string | null
    blog: string | null
    message: string | null
}

export const Github = React.memo(() => {
        const [users, setUsers] = useState<SearchUsertype[]>([])
        const [selectedUser, setSelectedUser] = useState<SearchUsertype | null>(null)
        const [tempSearch, setTempSearch] = useState<string>('')
        const [searchTerm, setSearchTerm] = useState<string>('')
        const [isFollowersRequested, setIsFollowersRequested] = useState<boolean>(false)
        const [isFollowingRequested, setIsFollowingRequested] = useState<boolean>(false)
        const [isRepositoriesRequested, setIsRepositoriesRequested] = useState<boolean>(false)
        const [fetchingRepositories, setFetchingRepositories] = useState<boolean>(false)
        const [fetchingFollowers, setFetchingFollowers] = useState<boolean>(false)
        const [fetchingFollowing, setFetchingFollowing] = useState<boolean>(false)
        const [isFetchingUsers, setIsFetchingUsers] = useState<boolean>(false)
        const [repositoriesCount, setRepositoriesCount] = useState<number | undefined>(undefined)
        const [repositoriesPagesCount, setRepositoriesPagesCount] = useState<number>(1)
        const [followersPagesCount, setFollowersPagesCount] = useState<number>(1)
        const [followingPagesCount, setFollowingPagesCount] = useState<number>(1)
        const [currentSearchPage, setCurrentSearchPage] = useState<number>(1)
        const [isLoadMoreUsersBtnActive, setIsLoadMoreUsersBtnActive] = useState<boolean>(false)
        const [isUserRemembered, setIsUserRemembered] = useState<boolean>(false)
        const [rememberedUsers, setRememberedUsers] = useState<Array<UserType>>([])
        const [requestErrorMessage, setRequestErrorMessage] = useState<string | null>(null)

        const initializeRememberedUsers = async () => {
            let loginsArr: Array<string> = []
            let users: Array<UserType> = []
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i)) {
                    // @ts-ignore
                    let userLogin = localStorage.getItem(localStorage.key(i))
                    if (userLogin) {
                        loginsArr.push(userLogin)
                    }
                }
            }
            const fetchingRememberedUsers = async () => {
                for (const login of loginsArr) {
                    await axios
                        .get<UserType>(`https://api.github.com/users/${login}`)
                        .then(res => {
                            if (res.status === 200) {
                                users.push(res.data)
                            } else if (res.data.message) {
                                setRequestErrorMessage(res.data.message)
                            }
                        })
                        .catch(e => {
                            console.log(`res error: ${e}`)
                        })
                }
            }
            await fetchingRememberedUsers()
            return users
        }
        useEffect(() => {
            initializeRememberedUsers().then(res => setRememberedUsers(res))
        }, [isUserRemembered])
        const calculateUsersPagesCount = async () => {
            let per_page = 56
            return await axios
                .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}&page=${currentSearchPage}&per_page=${per_page}`)
                .then(res => {
                    let totalCount: number = res.data.total_count
                    let usersPagesCount: number = Math.ceil(totalCount / per_page)
                    if (currentSearchPage < usersPagesCount) {
                        setIsLoadMoreUsersBtnActive(true)
                    }
                    if (currentSearchPage >= usersPagesCount) {
                        setIsLoadMoreUsersBtnActive(false)
                    }
                    return usersPagesCount
                })
                .catch(e => {
                    console.log(`res error: ${e}`)
                })
        }
        const fetchingUsers = () => {
            axios
                .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}&page=${currentSearchPage}&per_page=56`)
                .then(res => {
                    setUsers([...users, ...res.data.items])
                    setCurrentSearchPage(currentSearchPage + 1)
                })
                .catch(e => {
                    console.log(`res error: ${e}`)
                })
                .finally(() => setIsFetchingUsers(false))
            setTempSearch('')
        }
        useEffect(() => {
            if (searchTerm.length > 0) {
                calculateUsersPagesCount().then(usersPagesCount => {
                    if (isFetchingUsers && currentSearchPage <= usersPagesCount) {
                        fetchingUsers()
                    }
                })
            }
        }, [isFetchingUsers])

        const calculatePagesCount = (followersCount: number, followingCount: number, repositoriesCount: number) => {
            let per_page = 21
            setFollowersPagesCount(Math.ceil(followersCount / per_page))
            setFollowingPagesCount(Math.ceil(followingCount / per_page))
            setRepositoriesPagesCount(Math.ceil(repositoriesCount / per_page))
        }
        return (
            <Context.Provider value={{
                users, setUsers, selectedUser, setSelectedUser, searchTerm, setSearchTerm,
                isFollowersRequested, setIsFollowersRequested, isFollowingRequested, setIsFollowingRequested,
                isRepositoriesRequested, setIsRepositoriesRequested, tempSearch, setTempSearch,
                fetchingRepositories, setFetchingRepositories, repositoriesCount, setRepositoriesCount,
                calculatePagesCount, repositoriesPagesCount, fetchingFollowers, setFetchingFollowers, followersPagesCount,
                fetchingFollowing, setFetchingFollowing, followingPagesCount, isFetchingUsers, setIsFetchingUsers,
                isLoadMoreUsersBtnActive, setCurrentSearchPage, isUserRemembered, setIsUserRemembered,
                rememberedUsers, setRememberedUsers, requestErrorMessage
            }}>
                <div className={styles.scroll}>
                    <Header/>
                    <div className={styles._container}>
                        <div className={styles.content}>
                            {
                                users.length > 0 && <SearchList/>
                            }
                            {
                                selectedUser && <Profile/>
                            }
                            {
                                rememberedUsers.length > 0 && <RememberedUsers/>
                            }
                        </div>
                    </div>
                </div>
            </Context.Provider>
        )
    }
)

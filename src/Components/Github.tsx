import React, {useEffect, useState} from "react";
import styles from "./Github.module.scss"
import {Header} from "./Header";
import {SearchList} from "./SearchList";
import {Profile} from "./Profile";
import {Context} from "../Context";
import axios from "axios";


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
}

export const Github = () => {
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
    const [fetchingUsers, setFetchingUsers] = useState<boolean>(false)
    const [repositoriesCount, setRepositoriesCount] = useState<number | undefined>(undefined)
    const [repositoriesPagesCount, setRepositoriesPagesCount] = useState<number>()
    const [followersPagesCount, setFollowersPagesCount] = useState<number>()
    const [followingPagesCount, setFollowingPagesCount] = useState<number>()
    const [usersPagesCount, setUsersPagesCount] = useState<number>()
    const [currentSearchPage, setCurrentSearchPage] = useState<number>(1)
    const [isLoadMoreUsersBtnActive, setIsLoadMoreUsersBtnActive] = useState<boolean>(false)
    const resetTempSearch = () => {
        setTempSearch('')
    }
    useEffect(() => {
        console.log('Sync tab title')
        if (selectedUser) {
            document.title = selectedUser.login
        }
    }, [selectedUser])
    useEffect(() => {
        console.log('Sync users')
        if (searchTerm.length > 0) {
            // @ts-ignore
            if(fetchingUsers) {
                axios
                    .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}&page=${currentSearchPage}&per_page=48`)
                    .then(res => {
                        setUsers(res.data.items)
                        setCurrentSearchPage(currentSearchPage + 1)
                        calculateUsersPagesCount(res.data.total_count)
                    })
                    .finally(() => setFetchingUsers(false))
                resetTempSearch()
            }
            // @ts-ignore
            if (currentSearchPage >= usersPagesCount) {

                setIsLoadMoreUsersBtnActive(false)
            }
        }
    }, [searchTerm])
    useEffect(() => {
        console.log('Sync users')
        if (searchTerm.length > 0) {
            // @ts-ignore
            if(fetchingUsers && currentSearchPage <= usersPagesCount) {
                axios
                    .get<SearchResult>(`https://api.github.com/search/users?q=${searchTerm}&page=${currentSearchPage}&per_page=48`)
                    .then(res => {
                        setUsers([...users, ...res.data.items])
                        console.log([...users, ...res.data.items])
                        setCurrentSearchPage(currentSearchPage + 1)
                        calculateUsersPagesCount(res.data.total_count)
                    })
                    .finally(() => setFetchingUsers(false))
                resetTempSearch()
            }
            // @ts-ignore
            if (currentSearchPage >= usersPagesCount) {

                setIsLoadMoreUsersBtnActive(false)
            }

        }
    }, [fetchingUsers])

    const calculateUsersPagesCount = (totalCount: number) => {
        let per_page = 48
        let usersPagesCount = Math.ceil(totalCount / per_page)
        setUsersPagesCount(usersPagesCount)
        if (currentSearchPage < usersPagesCount) {
            setIsLoadMoreUsersBtnActive(true)
        }
        if (currentSearchPage >= usersPagesCount) {
            setIsLoadMoreUsersBtnActive(false)
        }
    }
    const calculatePagesCount = (followersCount: number, followingCount: number, repositoriesCount: number) => {
        let per_page = 18
        setFollowersPagesCount(Math.ceil(followersCount / per_page))
        setFollowingPagesCount(Math.ceil(followingCount / per_page))
        setRepositoriesPagesCount(Math.ceil(repositoriesCount / per_page))
    }
    return (
        <Context.Provider value={{
            users, setUsers,
            selectedUser, setSelectedUser, searchTerm, setSearchTerm,
            isFollowersRequested, setIsFollowersRequested, isFollowingRequested, setIsFollowingRequested,
            isRepositoriesRequested, setIsRepositoriesRequested, tempSearch, setTempSearch, resetTempSearch,
            fetchingRepositories, setFetchingRepositories, repositoriesCount, setRepositoriesCount,
            calculatePagesCount, repositoriesPagesCount, fetchingFollowers, setFetchingFollowers, followersPagesCount,
            fetchingFollowing, setFetchingFollowing, followingPagesCount, fetchingUsers, setFetchingUsers,
            isLoadMoreUsersBtnActive, setCurrentSearchPage
        }}>
            <div>
                <Header/>
                    <div className={styles._container}>
                        <div className={styles.content}>
                            <SearchList/>
                            {
                                selectedUser && <Profile/>
                            }
                        </div>
                    </div>
            </div>
        </Context.Provider>
    )
}
import React from "react";
import {SearchUsertype} from "./Components/Github";

type ContextType = {
    users: SearchUsertype[]
    setUsers: (users: SearchUsertype[]) => void
    selectedUser: SearchUsertype | null
    setSelectedUser: (user: SearchUsertype | null) => void
    searchTerm: string
    setSearchTerm: (term: string) => void
    isFollowersRequested: boolean
    setIsFollowersRequested: (isFollowersRequested: boolean) => void
    isFollowingRequested: boolean
    setIsFollowingRequested: (isFollowingRequested: boolean) => void
    isRepositoriesRequested: boolean
    setIsRepositoriesRequested: (isRepositoriesRequested: boolean) => void
    tempSearch: string
    setTempSearch: (tempSearch: string) => void
    resetTempSearch: () => void
    fetchingRepositories: boolean
    setFetchingRepositories: (fetchingRepositories: boolean) => void
    repositoriesCount: number | undefined
    setRepositoriesCount: (repositoriesCount: number | undefined) => void
    calculatePagesCount: (followersCount: number, followingCount: number, repositoriesCount: number) => void
    repositoriesPagesCount: number | undefined
    fetchingFollowers: boolean
    setFetchingFollowers: (fetchingFollowers: boolean) => void
    fetchingFollowing: boolean
    setFetchingFollowing: (fetchingFollowing: boolean) => void
    followersPagesCount: number | undefined
    followingPagesCount: number | undefined
    fetchingUsers: boolean
    setFetchingUsers: (fetchingUsers: boolean) => void
    isLoadMoreUsersBtnActive: boolean
    setCurrentSearchPage: (currentSearchPage: number) => void
}

// @ts-ignore
export const Context = React.createContext<ContextType>()
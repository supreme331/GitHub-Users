import React from "react";
import {SearchUsertype, UserType} from "./Components/Github";

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
    fetchingRepositories: boolean
    setFetchingRepositories: (fetchingRepositories: boolean) => void
    repositoriesCount: number | undefined
    setRepositoriesCount: (repositoriesCount: number | undefined) => void
    calculatePagesCount: (followersCount: number, followingCount: number, repositoriesCount: number) => void
    repositoriesPagesCount: number
    fetchingFollowers: boolean
    setFetchingFollowers: (fetchingFollowers: boolean) => void
    fetchingFollowing: boolean
    setFetchingFollowing: (fetchingFollowing: boolean) => void
    followersPagesCount: number
    followingPagesCount: number
    isFetchingUsers: boolean
    setIsFetchingUsers: (isFetchingUsers: boolean) => void
    isLoadMoreUsersBtnActive: boolean
    setCurrentSearchPage: (currentSearchPage: number) => void
    isUserRemembered: boolean
    setIsUserRemembered: (isUserRemembered: boolean) => void
    rememberedUsers: Array<UserType>
    setRememberedUsers: (rememberedUsers: Array<UserType>) => void
    requestErrorMessage: string | null
}

// @ts-ignore
export const Context = React.createContext<ContextType>()
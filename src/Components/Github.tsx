import React, {useEffect, useState} from "react"
import styles from "./Github.module.scss"
import {Header} from "./Header"
import {SearchList} from "./SearchList"
import {Profile} from "./Profile"
import {RememberedUsers} from "./RememberedUsers"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {initRememberedUsers} from "../store/reducers/UsersSlice"
import {ErrorBlock} from "./ErrorBlock"

export const Github = React.memo(() => {

        const dispatch = useAppDispatch()
        const {rememberedUsersLogins} = useAppSelector(state => state.usersReducer)
        const [selectedUserLogin, setSelectedUserLogin] = useState<string>('')
        const [searchTerm, setSearchTerm] = useState<string>('')
        const [error, setError] = useState<string>('')
        const usersError = useAppSelector(state => state.usersReducer.error)
        const repositoriesError = useAppSelector(state => state.repositoriesReducer.error)

        useEffect(() => {
            dispatch(initRememberedUsers())
        }, [])

        useEffect(() => {
            usersError && setError(usersError)
            repositoriesError && setError(repositoriesError)
            window.scroll(0, 0)
        }, [usersError, repositoriesError])

        return (
            <div className={styles.scroll}>
                {error && <ErrorBlock error={error}/>}
                <Header setSearchTerm={setSearchTerm}/>
                <div className={styles._container}>
                    <div className={styles.content}>
                        <SearchList
                            searchTerm={searchTerm}
                            setSelectedUserLogin={setSelectedUserLogin}/>
                        {
                            selectedUserLogin &&
                            <Profile
                                selectedUserLogin={selectedUserLogin}
                                setSelectedUserLogin={setSelectedUserLogin}/>
                        }
                        {
                            rememberedUsersLogins.length > 0 &&
                            <RememberedUsers setSelectedUserLogin={setSelectedUserLogin}/>
                        }
                    </div>
                </div>
            </div>
        )
    }
)


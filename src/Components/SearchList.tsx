import styles from "./Github.module.scss"
import React, {useEffect, useState} from "react"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {fetchUsers} from "../store/reducers/UsersSlice"
import {User} from "./User"

export const SearchList: React.FC<SearchListPropsType> = ({searchTerm, setSelectedUserLogin}) => {

    const dispatch = useAppDispatch()
    const {users, selectedUser} = useAppSelector(state => state.usersReducer)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const loadUsers = () => {
        if (searchTerm) {
            dispatch(fetchUsers({searchTerm, currentPage}))
            setCurrentPage(() => currentPage + 1)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [searchTerm])

    return (
        <>
            {users.length > 0 && <div className={`${styles.searchBlock} ${styles.scroll}`}>
                <h2 className={styles.title}>Found users</h2>
                <ul className={styles.usersList}>
                    {users
                        .map((u) => <li className={`${styles.user} ${selectedUser?.id === u.id ? styles.selected : ''}`}
                                        key={u.id}
                                        onClick={() => {
                                            setSelectedUserLogin(u.login)
                                        }}>
                            <User user={u} />
                        </li>)}
                </ul>
                <div className={styles.loadMoreBtn} onClick={() => loadUsers()}>Load more</div>
            </div>
            }
        </>
    )
}


type SearchListPropsType = {
    searchTerm: string;
    setSelectedUserLogin: (login: string) => void
}
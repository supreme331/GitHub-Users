import React, {useEffect} from "react"
import styles from "./Github.module.scss"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {fetchRememberedUser} from "../store/reducers/UsersSlice"

export const RememberedUsers: React.FC<RememberedUsersPropsType> = ({setSelectedUserLogin}) => {

    const dispatch = useAppDispatch()
    const {rememberedUsersLogins, rememberedUsers, selectedUser} = useAppSelector(state => state.usersReducer)

    useEffect(() => {
        rememberedUsersLogins.forEach(userLogin => {
            if (rememberedUsers.every(user => user.login !== userLogin)) {
                dispatch(fetchRememberedUser(userLogin))
            }
        })
    }, [rememberedUsersLogins])

    return (
        <div className={`${styles.rememberedBlock} ${styles.scroll}`}>
            <h2 className={styles.title}>Remembered users</h2>
            <ul className={styles.usersList}>
                {
                    rememberedUsers.map(u => <li
                        className={`${styles.user} ${selectedUser?.id === u.id ? styles.selected : ''}`} key={u.id}
                        onClick={() => {
                            setSelectedUserLogin(u.login)
                        }}>
                        <div className={styles.avatarMin}>
                            <img src={u.avatar_url} alt="avatar"/>
                        </div>
                        <span className={styles.userLogin}>{u.login}</span>
                    </li>)
                }
            </ul>
        </div>
    )
}

type RememberedUsersPropsType = {
    setSelectedUserLogin: (login: string) => void
}
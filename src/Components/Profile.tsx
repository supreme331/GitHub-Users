import styles from "./Github.module.scss"
import React, {useEffect, useState} from "react"
import {Additional} from "./Additional"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {
    addRememberedUser,
    deleteRememberedUser,
    fetchFollowersUsers,
    fetchFollowingUsers,
    fetchSelectedUser
} from "../store/reducers/UsersSlice"
import {fetchRepositories} from "../store/reducers/RepositoriesSlice"
import {IUser} from "../models/IUser"

export const Profile: React.FC<ProfilePropsType> = ({selectedUserLogin, setSelectedUserLogin}) => {

    const dispatch = useAppDispatch()
    const {selectedUser, rememberedUsersLogins} = useAppSelector(state => state.usersReducer)
    const [isRemembered, setIsRemembered] = useState<boolean>(false)
    const [additionalComponentName, setAdditionalComponentName] = useState<string>('')

    useEffect(() => {
        dispatch(fetchSelectedUser(selectedUserLogin))
        dispatch(fetchFollowingUsers(null))
        dispatch(fetchFollowersUsers(null))
        dispatch(fetchRepositories(null))
        setAdditionalComponentName('')
        setIsRemembered(rememberedUsersLogins.includes(selectedUserLogin))
    }, [selectedUserLogin])

    return (
        <div className={styles.userProfile}>
            {selectedUser &&
                <ProfileContent
                    selectedUser={selectedUser}
                    setIsRemembered={setIsRemembered}
                    isRemembered={isRemembered}
                    setAdditionalComponentName={setAdditionalComponentName}
                    setSelectedUserLogin={setSelectedUserLogin}/>
            }
            <Additional
                additionalComponentName={additionalComponentName}
                setSelectedUserLogin={setSelectedUserLogin}
                selectedUserLogin={selectedUserLogin}/>
        </div>
    )
}

const ProfileContent: React.FC<ProfileContentPropsType> = ({
                                                               selectedUser,
                                                               setIsRemembered,
                                                               isRemembered,
                                                               setAdditionalComponentName,
                                                               setSelectedUserLogin
                                                           }) => {

    const dispatch = useAppDispatch()

    return (
        <div className={styles.profileContent}>
            <div className={styles.wrapperBlock}>
                <AvatarBlock selectedUser={selectedUser}/>
                <ButtonsBlock
                    selectedUser={selectedUser}
                    setIsRemembered={setIsRemembered}
                    isRemembered={isRemembered}/>
            </div>
            <ProfileInfo selectedUser={selectedUser} setAdditionalComponentName={setAdditionalComponentName}/>
            <div className={styles.closeUserProfileBtn} onClick={() => {
                dispatch(fetchSelectedUser(''))
                setSelectedUserLogin('')
            }}>X
            </div>
        </div>
    )
}

const AvatarBlock: React.FC<AvatarBlockPropsType> = ({selectedUser}) => {
    return (
        <div className={`${styles.avatar + ' ' + styles._ibg}`}>
            <img src={selectedUser.avatar_url} alt=""/>
        </div>
    )
}

const ButtonsBlock: React.FC<ButtonsBlockPropsType> = ({
                                                           selectedUser,
                                                           isRemembered,
                                                           setIsRemembered
                                                       }) => {

    const dispatch = useAppDispatch()

    return (
        <div className={styles.buttons}>
            <a className={styles.button} target='_blank' rel='noreferrer'
               href={`https://github.com/${selectedUser.login}`}>
                Open profile in GitHub
            </a>
            {
                isRemembered ? <div className={styles.button} onClick={() => {
                        dispatch(deleteRememberedUser(selectedUser.login))
                        setIsRemembered(false)
                    }}>Remove from remembered</div> :
                    <div className={styles.button} onClick={() => {
                        dispatch(addRememberedUser(selectedUser.login))
                        setIsRemembered(true)
                    }}>Remember user</div>
            }
        </div>
    )
}

const ProfileInfo: React.FC<ProfileInfoPropsType> = ({selectedUser, setAdditionalComponentName}) => {
    return (
        <div className={styles.profileInfo}>
            <div className={styles.profileLogin}>{selectedUser.login}</div>
            {
                selectedUser.name && <div><span>Name:</span> {selectedUser.name}</div>
            }
            {
                selectedUser.company && <div><span>Company:</span> {selectedUser.company}</div>
            }
            {
                selectedUser.location && <div><span>Location:</span> {selectedUser.location}</div>
            }
            {
                selectedUser.twitter_username &&
                <div><span>Twitter user name:</span> {selectedUser.twitter_username}</div>
            }
            {
                selectedUser.bio && <div><span>Bio:</span> {selectedUser.bio}</div>
            }
            {
                selectedUser.blog &&
                <a className={styles.profileInfoItem} target='_blank' rel='noreferrer'
                   href={selectedUser.blog}>Blog</a>
            }
            <div className={styles.profileInfoItem} onClick={() => {
                if (selectedUser.followers > 0) {
                    setAdditionalComponentName('followers')
                }
            }}>Followers: {selectedUser.followers}</div>
            <div className={styles.profileInfoItem} onClick={() => {
                if (selectedUser.following > 0) {
                    setAdditionalComponentName('following')
                }
            }}>Following: {selectedUser.following}</div>
            <div className={styles.profileInfoItem} onClick={() => {
                if (selectedUser.public_repos > 0) {
                    setAdditionalComponentName('repositories')
                }
            }}>Repositories: {selectedUser.public_repos}</div>
        </div>
    )
}

type ProfileContentPropsType = {
    selectedUser: IUser;
    setIsRemembered: (isRemembered: boolean) => void;
    isRemembered: boolean;
    setAdditionalComponentName: (additionalComponentName: string) => void;
    setSelectedUserLogin: (login: string) => void;
}

type AvatarBlockPropsType = {
    selectedUser: IUser;
}

type ButtonsBlockPropsType = {
    selectedUser: IUser;
    isRemembered: boolean;
    setIsRemembered: (isRemembered: boolean) => void;
}

type ProfilePropsType = {
    selectedUserLogin: string;
    setSelectedUserLogin: (login: string) => void;
}

type ProfileInfoPropsType = {
    selectedUser: IUser;
    setAdditionalComponentName: (additionalComponentName: string) => void;
}
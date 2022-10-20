import React, {useEffect, useState} from "react"
import styles from "./Github.module.scss"
import {useAppDispatch, useAppSelector} from "../hooks/redux"
import {fetchRepositories} from "../store/reducers/RepositoriesSlice"
import {IRepository} from "../models/IRepository"
import {LoadMore} from "./LoadMore"

export const Repositories: React.FC = () => {

    const dispatch = useAppDispatch()
    const selectedUser = useAppSelector(state => state.usersReducer.selectedUser)
    const {repositories} = useAppSelector(state => state.repositoriesReducer)
    const [currentPage, setCurrentPage] = useState<number>(1)

    const loadRepositories = () => {
        if (selectedUser) {
            dispatch(fetchRepositories({login: selectedUser.login, currentPage}))
            setCurrentPage(() => currentPage + 1)
        }
    }

    useEffect(() => {
        loadRepositories()
    }, [])

    return (
        <div className={styles.additional}>
            <div className={styles.additionalContent}>
                <h2 className={styles.title}>Repositories</h2>
                <ul className={styles.repositoriesBlock}>
                    {repositories
                        .map(repo => <li className={styles.repository} key={repo.id}>
                                <Repository repository={repo}/>
                            </li>
                        )}
                </ul>
                <LoadMore callBack={loadRepositories} />
            </div>
        </div>
    )
}

const Repository: React.FC<RepositoryPropsType> = ({ repository }) => {
    return (
        <>
            <h3 className={styles.repositoryTitle}>
                {repository.name}
            </h3>
            {repository.description &&
                <div>
                    <div className={styles.repositorySubtitle}>Description:</div>
                    {repository.description}
                </div>
            }
            {repository.language && <div>
                <div className={styles.repositorySubtitle}>Language:</div>
                {repository.language}
            </div>}
            {repository.updated_at && <div>
                <div className={styles.repositorySubtitle}>Updated:</div>
                {new Date(repository.updated_at).toString().slice(0, 15)}
            </div>
            }
            <a className={styles.button} target='_blank' rel='noreferrer' href={repository.html_url}>
                Open in GitHub
            </a>
        </>
    )
}

type RepositoryPropsType = {
    repository: IRepository;
}
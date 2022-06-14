import React, {useContext, useEffect, useState} from "react";
import {UserType} from "./Github";
import axios from "axios";
import {Context} from "../Context";
import styles from "./Github.module.scss";

type RepositoriesType = {
    id: number
    name: string
    owner: UserType
    html_url: string
    description: string | null
    language: string | null
    fork: boolean
    updated_at: string | number | Date
}

export const Repositories = React.memo(() => {
        const {
            selectedUser, isRepositoriesRequested, fetchingRepositories,
            setFetchingRepositories, repositoriesPagesCount
        } = useContext(Context)
        const [repositories, setRepositories] = useState<RepositoriesType[]>([])
        const [currentPage, setCurrentPage] = useState<number>(1)
        const [isLoadMoreBtnActive, setIsLoadMoreBtnActive] = useState<boolean>(true)

        useEffect(() => {
            if (fetchingRepositories && currentPage <= repositoriesPagesCount) {
                axios
                    .get<RepositoriesType[]>(`https://api.github.com/users/${selectedUser?.login}/repos?page=${currentPage}&per_page=21`)
                    .then(res => {
                        setRepositories([...repositories, ...res.data])
                        setCurrentPage(currentPage + 1)
                    })
                    .finally(() => setFetchingRepositories(false))
            }
            if (fetchingRepositories && currentPage === repositoriesPagesCount) {
                setIsLoadMoreBtnActive(false)
            }
        }, [fetchingRepositories])

        return (
            <div className={styles.additional}>
                {!!isRepositoriesRequested ? <div className={styles.additionalContent}>
                    <h2 className={styles.title}>Repositories</h2>
                    <ul className={styles.repositoriesBlock}>
                        {repositories
                            .map(repo => <li className={styles.repository} key={repo.id}>
                                    <div>
                                        <h3 className={styles.repositoryTitle}>
                                            {repo.name}
                                        </h3>
                                        {repo.description &&
                                            <div>
                                                <div className={styles.repositorySubtitle}>Description:</div>
                                                {repo.description}
                                            </div>
                                        }
                                        {repo.language && <div>
                                            <div className={styles.repositorySubtitle}>Language:</div>
                                            {repo.language}
                                        </div>}
                                        {repo.updated_at && <div>
                                            <div className={styles.repositorySubtitle}>Updated:</div>
                                            {new Date(repo.updated_at).toString().slice(0, 15)}
                                        </div>
                                        }
                                    </div>
                                    <a className={styles.button} target='_blank' rel='noreferrer' href={repo.html_url}>
                                        Open in GitHub
                                    </a>
                                </li>
                            )}
                    </ul>
                    {
                        isLoadMoreBtnActive &&
                        <div className={styles.loadMoreBtn} onClick={() => setFetchingRepositories(true)}>Load more</div>
                    }
                </div> : null
                }
            </div>
        )
    }
)


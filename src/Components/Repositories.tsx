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
type PropsType = {
}

export const Repositories: React.FC<PropsType> = React.memo(({}) => {
        const {selectedUser, isRepositoriesRequested,
            fetchingRepositories, setFetchingRepositories,
            repositoriesPagesCount} = useContext(Context)
        const [repositories, setRepositories] = useState<RepositoriesType[]>([])
        const [currentPage, setCurrentPage] = useState<number>(1)
        const [isLoadMoreBtnActive, setIsLoadMoreBtnActive] = useState<boolean>(true)
        // const scrollHandler = (e: any) => {
        //     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) {
        //         setFetchingRepositories(true)
        //     }
        // }
        //
        // useEffect(() => {
        //     document.addEventListener('scroll', scrollHandler)
        //     return function () {
        //         document.removeEventListener('scroll', scrollHandler)
        //     }
        // }, [])

        useEffect(() => {
            // @ts-ignore
            if (fetchingRepositories && currentPage <= repositoriesPagesCount) {
                axios
                    .get<RepositoriesType[]>(`https://api.github.com/users/${selectedUser?.login}/repos?page=${currentPage}&per_page=18`)
                    .then(res => {
                        setRepositories([...repositories, ...res.data])
                        setCurrentPage(currentPage + 1)
                    })
                    .finally(() => setFetchingRepositories(false))
            }
            // @ts-ignore
            if (fetchingRepositories && currentPage === repositoriesPagesCount) {
                setIsLoadMoreBtnActive(false)
            }
        }, [fetchingRepositories])

        return (
            <div className={styles.additional}>
                <h2 className={styles.title}>Repositories</h2>
                {!!isRepositoriesRequested ? <div>
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
                                    <a className={styles.button} target={'_blank'} href={repo.html_url}>
                                        Open in GitHub
                                    </a>
                                </li>
                            )}
                    </ul>
                    {
                        isLoadMoreBtnActive && <div className={styles.loadMoreBtn} onClick={() => setFetchingRepositories(true)}>Load more</div>
                    }
                </div> : null

                    }
            </div>
        )
    }
)


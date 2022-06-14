import React, {useContext} from "react";
import {Context} from "../Context";
import styles from "./Github.module.scss";
import logoIcon from "../img/github.png"

export const Header = () => {
    const {
        setSearchTerm, tempSearch, setTempSearch, setIsFetchingUsers,
        setUsers, setCurrentSearchPage
    } = useContext(Context)
    const submit = (tempSearch: string) => {
        setUsers([])
        setCurrentSearchPage(1)
        setSearchTerm(tempSearch)
        setIsFetchingUsers(true)
    }
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <a className={styles.logotype} href={'/'}>
                    <img src={logoIcon} alt="logo"/>
                </a>
                <a href={'/'}>
                    <h1 className={styles.headerTitle}>GitHub users</h1>
                </a>
            </div>
            <SearchForm tempSearch={tempSearch} setTempSearch={setTempSearch} submit={submit}/>
        </div>
    )
}

type SearchFormType = {
    tempSearch: string
    setTempSearch: (tempSearch: string) => void
    submit: (tempSearch: string) => void
}

const SearchForm: React.FC<SearchFormType> = ({tempSearch, setTempSearch, submit}) => {
    const handleSubmit = (e: any) => {
        e.preventDefault()
    }
    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <input required placeholder={'Search GitHub users'} type="search" value={tempSearch} onChange={(e) => {
                setTempSearch(e.currentTarget.value)
            }}/>
            <button type="submit" onClick={() => {
                submit(tempSearch)
            }}>Find
            </button>
        </form>
    )
}
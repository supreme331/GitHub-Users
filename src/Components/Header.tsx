import React, {useState} from "react"
import styles from "./Github.module.scss"
import logoIcon from "../img/github.png"
import {NavLink} from "react-router-dom"

export const Header: React.FC<HeaderPropsType> = ({ setSearchTerm }) => {

    const [tempSearch, setTempSearch] = useState<string>('')

    const submit = (tempSearch: string) => {
        setSearchTerm(tempSearch)
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <NavLink className={styles.logotype} to={'/'}>
                    <img src={logoIcon} alt="logo"/>
                </NavLink>
                <NavLink to={'/'}>
                    <h1 className={styles.headerTitle}>GitHub users</h1>
                </NavLink>
            </div>
            <SearchForm tempSearch={tempSearch} setTempSearch={setTempSearch} submit={submit}/>
        </div>
    )
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

type HeaderPropsType = {
    setSearchTerm: (searchTerm: string) => void;
}

type SearchFormType = {
    tempSearch: string
    setTempSearch: (tempSearch: string) => void
    submit: (tempSearch: string) => void
}
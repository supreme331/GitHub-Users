import React, {useContext} from "react";
import {Context} from "../Context";
import styles from "./Header.module.scss";
import logoIcon from "../img/github.png"

export const Header = () => {

    const {setSearchTerm, tempSearch, setTempSearch, setFetchingUsers, setUsers, setCurrentSearchPage} = useContext(Context)
    const submit = (tempSearch: string) => {
        console.log(tempSearch)
        setUsers([])
        setCurrentSearchPage(1)
        setSearchTerm(tempSearch)
        setFetchingUsers(true)
    }
    return (
        <div className={styles.header}>

                <div className={styles.logo}>
                    <a  href={'/'}>
                        <img src={logoIcon} alt="logo"/>
                    </a>
                </div>
                <a href={'/'}>
                    <h1 className={styles.title}>GitHub users</h1>
                </a>

            <SearchForm tempSearch={tempSearch} setTempSearch={setTempSearch} submit={submit}/>
        </div>
    )
}

type SearchFormType = {
    tempSearch: string
    setTempSearch: (tempSearch: string) => void
    submit: (tempSearch: string) => void
}

const SearchForm:React.FC<SearchFormType> = ({tempSearch, setTempSearch, submit}) => {
    const handleSubmit = (e:any) => {
        e.preventDefault()
    }
    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <input required placeholder={'Search GitHub users'} type="search"  value={tempSearch} onChange={(e) => {
                setTempSearch(e.currentTarget.value)
            }}/>
            <button type="submit" onClick={() => {
                submit(tempSearch)
            }}>Find
            </button>
        </form>
    )
}
import {useEffect, useState} from "react";
import axios from "axios";


type SearchUsertype = {
    login: string
    id: number
}
type SearchResult = {
    items: SearchUsertype[]
}

export const Github = () => {
    const [users, setUsers] = useState<SearchUsertype[]>([])
    useEffect(() => {
        axios
            .get<SearchResult>('https://api.github.com/search/users?q=dimych')
            .then(res => {
                setUsers(res.data.items)
            })
    }, [])
    return (
        <div>
            <ul>
                {users
                    .map(u => <li key={u.id}>{u.login}</li>)}
            </ul>
        </div>
    )
}
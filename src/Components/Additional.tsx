import {Followers} from "./Followers";
import styles from "./Github.module.scss"
import {Following} from "./Following";
import {Repositories} from "./Repositories";
import React, {useContext} from "react";
import {Context} from "../Context";

type PropsType = {
}

export const Additional: React.FC<PropsType> = ({})  => {
    const {isRepositoriesRequested, isFollowersRequested, isFollowingRequested} = useContext(Context)

    if (isFollowersRequested) {
        return <Followers />
    } else if (isFollowingRequested) {
        return <Following />
    } else if(isRepositoriesRequested) {
        return  <Repositories />
    } else {
        return null
    }
}
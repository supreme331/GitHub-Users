import {Followers} from "./Followers";
import {Following} from "./Following";
import {Repositories} from "./Repositories";
import React, {useContext} from "react";
import {Context} from "../Context";

export const Additional = () => {
    const {isRepositoriesRequested, isFollowersRequested, isFollowingRequested} = useContext(Context)

    if (isFollowersRequested) {
        return <Followers/>
    } else if (isFollowingRequested) {
        return <Following/>
    } else if (isRepositoriesRequested) {
        return <Repositories/>
    } else {
        return null
    }
}
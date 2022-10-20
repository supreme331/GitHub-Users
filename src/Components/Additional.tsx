import {FollowersAndFollowing} from "./FollowersAndFollowing"
import {Repositories} from "./Repositories"
import React from "react"

export const Additional: React.FC<AdditionalPropsType> = ({
                                                              additionalComponentName,
                                                              setSelectedUserLogin,
                                                              selectedUserLogin
                                                          }) => {

    if (additionalComponentName === 'followers' || additionalComponentName === 'following') {
        return <FollowersAndFollowing
            setSelectedUserLogin={setSelectedUserLogin}
            selectedUserLogin={selectedUserLogin}
            additionalComponentName={additionalComponentName}
        />
    } else if (additionalComponentName === 'repositories') {
        return <Repositories/>
    } else return null

}

type AdditionalPropsType = {
    additionalComponentName: string
    setSelectedUserLogin: (login: string) => void
    selectedUserLogin: string
}
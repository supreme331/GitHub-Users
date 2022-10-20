import styles from "./Github.module.scss"
import React from "react"

export const LoadMore:React.FC<LoadMorePropsType> = ({callBack}) => {
    return <div className={styles.loadMoreBtn} onClick={() => callBack()}>Load more</div>
}

type LoadMorePropsType = {
    callBack: () => void
}
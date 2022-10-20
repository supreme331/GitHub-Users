import React from "react"
import styles from './Github.module.scss'

export  const ErrorBlock: React.FC<ErrorBlockPropsType> = ({error}) => {
    return(
        <div className={styles.errorBlock}>
            <p className={styles.error}>
                {error}
            </p>
        </div>
    )
}

type ErrorBlockPropsType = {
    error: string
}
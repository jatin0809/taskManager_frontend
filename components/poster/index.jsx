import React from 'react'
import styles from "./poster.module.css"
import intro from "../../src/assets/intro.png"

export default function Poster() {
  return (
    <div className={styles.container}>
      <div className={styles.circle}></div>
      <img src={intro} className={styles.image} alt="" />
      <p className={styles.heading}>Welcome aboard my friend</p>
      <p className={styles.para}>just a couple of clicks and we start</p>
    </div>
  )
}

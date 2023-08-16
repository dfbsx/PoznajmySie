import styles from "../edit/page.module.css"
export default function Edit(){
    return(<div className={styles.page}>
        <div className={styles.avatarColumn}>Awatar</div>
        <div className={styles.dataColumn}>Dane</div>
    </div>)
};
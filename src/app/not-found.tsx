"use client"
import { useRouter } from "next/navigation";
import styles from "../app/page.module.css";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className={styles.bgPurple}>
      <div className={styles.stars}>
        <div className={styles.centralBody}>
          <img
            className={styles.image404}
            src="http://salehriaz.com/404Page/img/404.svg"
            width="300px"
          />
          <button className={styles.btnGoHome} onClick={()=>router.push("/")}>Wróć na Ziemię</button>
        </div>
        <div className={styles.objects}>
          <img
            className={styles.objectRocket}
            src="http://salehriaz.com/404Page/img/rocket.svg"
            width="40px"
          />
          <div className={styles.earthMoon}>
            <img
              className={styles.objectEarth}
              src="http://salehriaz.com/404Page/img/earth.svg"
              width="100px"
            />
            <img
              className={styles.objectMoon}
              src="http://salehriaz.com/404Page/img/moon.svg"
              width="80px"
            />
          </div>
          <div className={styles.boxAstronaut}>
            <img
              className={styles.objectAstronaut}
              src="http://salehriaz.com/404Page/img/astronaut.svg"
              width="140px"
            />
          </div>
          <div className={styles.glowingStars}>
            <div className={styles.star}></div>
            <div className={styles.star}></div>
            <div className={styles.star}></div>
            <div className={styles.star}></div>
            <div className={styles.star}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

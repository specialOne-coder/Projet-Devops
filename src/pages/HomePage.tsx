import styles from "../styles/style";
import { Welcome } from "../Components";

const HomePage = () => {

  return (
    <div className="bg-primary w-full overflow-hidden">
      <div className={`bg-primary ${styles.flexStart}`}>
        <div className={`${styles.boxWidth}`}>
          <Welcome />
        </div>
      </div>
    </div>
  );
}

export default HomePage;

import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Hello world!</h1>
      <Button label="app"></Button>
    </div>
  );
}

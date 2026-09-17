import { publicUrl } from "../utils/publicUrl";
import styles from "./BrandLogo.module.css";

type BrandLogoProps = {
  variant?: "horizontal" | "lockup" | "mark" | "wordmark";
  tone?: "dark" | "light";
  className?: string;
  alt?: string;
};

function asset(name: "lockup" | "mark" | "wordmark", tone: "dark" | "light") {
  const suffix = tone === "dark" ? "-dark" : "";
  return publicUrl(`brand/engels-${name}${suffix}.png`);
}

export function BrandLogo({
  variant = "horizontal",
  tone = "dark",
  className = "",
  alt = "Энгельс",
}: BrandLogoProps) {
  const classes = [styles.root, styles[variant], className].filter(Boolean).join(" ");

  if (variant === "horizontal") {
    return (
      <span className={classes} role="img" aria-label={alt}>
        <img className={styles.horizontalMark} src={asset("mark", tone)} alt="" />
        <img className={styles.horizontalWordmark} src={asset("wordmark", tone)} alt="" />
      </span>
    );
  }

  const source = variant === "lockup" ? "lockup" : variant;
  return <img className={classes} src={asset(source, tone)} alt={alt} />;
}

import React, { type FC } from "react";

import { icons } from "@/constants/icons";

import * as styles from "./icon.module.scss";

interface IconProps {
  name: keyof typeof icons;
  icon: {
    path?: string;
    viewBox?: string;
  };
}

const Icon: FC<IconProps> = ({ name, icon }) => (
  <svg className={styles.icon} viewBox={icon.viewBox}>
    <title>{name}</title>
    <path d={icon.path} />
  </svg>
);

export { Icon };

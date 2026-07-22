import React, { type FC } from "react";

import * as styles from "./sidebar-copyright.module.scss";

type SidebarCopyrightProps = {
  copyright: string;
};

const SidebarCopyright: FC<SidebarCopyrightProps> = ({ copyright }) => (
  <div className={styles.sidebarCopyright}>{copyright}</div>
);

export { SidebarCopyright };

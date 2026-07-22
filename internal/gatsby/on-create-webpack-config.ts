import path from "path";

import { type CompilerOptions } from "typescript";
import { type CreateWebpackConfigArgs } from "gatsby";

import { compilerOptions } from "../../tsconfig.json";

const onCreateWebpackConfig = (
  (options: Pick<CompilerOptions, "paths">) =>
  ({ actions }: CreateWebpackConfigArgs) => {
    actions.setWebpackConfig({
      resolve: {
        alias: Object.entries(options.paths || []).reduce(
          (aliases, [name, [target]]) => ({
            ...aliases,
            [name.replace("/*", "")]: path.resolve(target.replace("/*", "")),
          }),
          {},
        ),
      },
    });
  }
)(compilerOptions);

export { onCreateWebpackConfig };

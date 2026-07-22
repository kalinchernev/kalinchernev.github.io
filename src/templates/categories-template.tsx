import React, { type FC } from "react";

import { Link } from "gatsby";

import { Meta } from "@/components/meta";
import { Page } from "@/components/page";
import { Layout } from "@/components/layout";
import { Sidebar } from "@/components/sidebar";
import { useCategoriesList } from "@/hooks/use-categories-list";
import { useSiteMetadata } from "@/hooks/use-site-metadata";
import { toKebabCase } from "@/utils/to-kebab-case";

const CategoriesTemplate: FC = () => {
  const categories = useCategoriesList();

  return (
    <Layout>
      <Sidebar />
      <Page title="Categories">
        <ul>
          {categories.map((category) => (
            <li key={category.fieldValue}>
              <Link to={`/category/${toKebabCase(category.fieldValue)}/`}>
                {category.fieldValue} ({category.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export const Head: FC = () => {
  const { title, description } = useSiteMetadata();
  const pageTitle = `Categories - ${title}`;

  return <Meta title={pageTitle} description={description} />;
};

export default CategoriesTemplate;

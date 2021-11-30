import type { GetStaticProps, NextPage } from 'next';
import type { PageType, MenuType } from '../types/index';

const Page: NextPage<{ page: PageType; menu: MenuType }> = ({ page, menu }) => {
  return <pre><code>{JSON.stringify({ menu, page }, null, 2)}</code></pre>;
};

export default Page;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export const getStaticProps: GetStaticProps<
  { page: PageType; menu: MenuType },
  { slug?: string | string[] }
> = async (context) => {
  let slug = context?.params?.slug;

  if (slug !== undefined) {
    slug = [slug].flat().join('/');
  } else {
    const res = await fetch(
      `${process.env.WORDPRESS_HOST}/wp-json/wp/v2/page_on_front`
    );
    slug = (await res.json()).slug;
  }

  const resPage = await fetch(
    `${process.env.WORDPRESS_HOST}/wp-json/wp/v2/permalink?url=${slug}`
  );
  const page: PageType = await resPage.json();

  if (!page || resPage.status !== 200) {
    return {
      notFound: true,
    };
  }

  const resMenu = await fetch(
    `${process.env.WORDPRESS_HOST}/wp-json/menus/v1/menus/primary`
  );
  const menu = await resMenu.json();

  return {
    props: { page, menu },
    revalidate: 60,
  };
};

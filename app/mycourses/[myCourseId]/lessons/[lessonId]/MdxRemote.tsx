import { MDXRemote } from "next-mdx-remote/rsc";
export type MdxProseProps = { markdown: string };
import rehypePrism from "rehype-prism-plus";

export const MdxProse = (props: MdxProseProps) => {
  return (
    <article className="prose m-auto dark:prose-invert xl:prose-xl">
      <MDXRemote
        options={{
          mdxOptions: {
            rehypePlugins: [rehypePrism],
          },
        }}
        source={props.markdown}
      />
      ;
    </article>
  );
};

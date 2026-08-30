import { compiler } from "markdown-to-jsx";

import { createHeadingSlug } from "@utils/getToc";
import overrides from "@components/ui/Markdown/overrides";

interface IProps {
  content: string;
  className?: string;
}

const Viewer = ({ content, className = "" }: IProps) => {
  const markdown = compiler(content, {
    wrapper: null,
    overrides,
    slugify: createHeadingSlug(),
    disableParsingRawHTML: true,
  });

  return (
    <div className={`markdown w-[theme(screens.md.max)] md:w-full ${className}`}>{markdown}</div>
  );
};

export default Viewer;

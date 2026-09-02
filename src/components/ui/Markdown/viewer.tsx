import { compileMarkdown } from "@components/ui/Markdown/compiler";

interface IProps {
  content: string;
  className?: string;
}

const Viewer = ({ content, className = "" }: IProps) => {
  const markdown = compileMarkdown(content);

  return (
    <div className={`markdown w-[theme(screens.md.max)] md:w-full ${className}`}>{markdown}</div>
  );
};

export default Viewer;

interface IProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const SectionHeader = ({ children, onClick }: IProps) => {
  return (
    <div className="mb-4 flex w-full gap-4 text-primary transition-[color]">
      <h1 className="text-4xl font-bold">{children}</h1>
      {onClick && (
        <span onClick={onClick} className="cursor-pointer font-normal">
          관리
        </span>
      )}
    </div>
  );
};

export default SectionHeader;

type AboutIconProps = {
  handleClick: () => void;
};

const AboutIcon: React.FC<AboutIconProps> = ({ handleClick }) => {
  return (
    <div
      onClick={handleClick}
      className="group absolute left-6 top-6 z-20 flex h-9 w-9 cursor-pointer items-center justify-center border border-white fill-current text-white mix-blend-difference"
    >
      <div className="h-3 w-3 rotate-45 transform bg-white transition duration-300 ease-in-out group-hover:rotate-0" />
    </div>
  );
};

export default AboutIcon;

import "./LoadingIndicator.styles.scss";

interface LoadingIndicatorProps {
  showMask?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  showMask = true,
}) => {
  return (
    <div className={`loading ${showMask ? "loading-mask" : ""}`}>
      <span className="pi pi-spin pi-spinner text-4xl" />
    </div>
  );
};

export default LoadingIndicator;

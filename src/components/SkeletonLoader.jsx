import { Oval } from 'react-loader-spinner';

const SkeletonLoader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#0B6DF6"
        secondaryColor="#e0e0e0"
        ariaLabel="oval-loading"
      />
    </div>
  );
};

export default SkeletonLoader;

import './style.css';

const SkeletonChart = () => {
  return (
    <div className='skeleton-chart-container'>
      <div className='skeleton-chart-description'>
        <div className='chart-description-top'></div>
        <div className='chart-description-mid'></div>
        <div className='chart-description-btns'>
          <span className='chart-description-btn'></span>
          <span className='chart-description-btn'></span>
        </div>
      </div>
      <div className='skeleton-chart-wrapper'>
        <div className='skeleton-chart'></div>
      </div>
    </div>
  );
};

export default SkeletonChart;

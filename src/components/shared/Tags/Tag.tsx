import { Tag } from 'antd';
import './style.css';
import PropTypes from 'prop-types';

const crossIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="6"
    height="6"
    viewBox="0 0 6 6"
    fill="none"
    style={{ marginLeft: 5 }}
  >
    <path
      d="M4.99529 1.00146L1.00195 4.9948"
      stroke="#FF3672"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 5L1 1"
      stroke="#FF3672"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface FilteredTagProps {
  text: string;
}

const FilteredTag: React.FC<FilteredTagProps> = ({ text }) => {
  return (
    <div className="filtered_tag">
      <Tag icon={crossIcon}>{text}</Tag>
    </div>
  );
};

FilteredTag.propTypes = {
  text: PropTypes.string.isRequired,
};

export default FilteredTag;

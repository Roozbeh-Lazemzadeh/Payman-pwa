import React from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import './style.css';
import { useAppSelector } from '../hooks/reduxHooks';
import { selectSelectedMerchant } from '../../store/chart/chartSlice';

export const RechartPieChart: React.FC = () => {
  // const [activeIndex, setActiveIndex] = useState(0);

  // const onPieEnter = (_: any, index: number) => {
  //   console.log(index);
  //   setActiveIndex(index);
  // };
  const activeIndex = useAppSelector(selectSelectedMerchant);

  const data = [
    { name: 'اسنپ', value: 400 },
    { name: 'تپسی', value: 300 },
    { name: 'فیلیمو', value: 550 },
    { name: 'همه', value: 0 },
  ];

  const COLORS = ['#00E261', '#FF683B', '#FFAA1B', '#0072FF'];

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, startAngle, endAngle, fill, percent } = props;

    return (
      <g>
        <text
          className="chart-text"
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          fill={fill}
        >
          {`%${activeIndex !== 3 ? (percent * 100).toFixed(0) : '100'}`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={activeIndex !== 1000 ? 90 : 80}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={5}
        />
      </g>
    );
  };

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={65}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          // onMouseEnter={onPieEnter}
          paddingAngle={4}
          cornerRadius={5}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              style={{ outline: 'none' }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

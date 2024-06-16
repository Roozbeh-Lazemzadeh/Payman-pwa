import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import './style.css';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { selectMerchant } from '../../store/chart/chartSlice';

interface RechartPieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  selectedIndex?: number;
  onCellClick: (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    index: number
  ) => void;
}

const RechartPieChart: React.FC<RechartPieChartProps> = ({
  data,
  selectedIndex,
  onCellClick,
}) => {
  const dispatch = useAppDispatch();
  const activeIndex = useAppSelector((state) => state.chart.selectedMerchant);
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, startAngle, endAngle, fill, percent } = props;
    return (
      <g>
        <text
          className='chart-text'
          x={cx}
          y={cy}
          dy={8}
          textAnchor='middle'
          fill={fill}
        >
          {activeIndex === 4 ? '%100' : `%${(percent * 100).toFixed(0)}`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={90} // outerRadius set to 90 when selectedIndex is not -1
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={5}
          style={{ outline: 'none' }}
        />
      </g>
    );
  };
  // }

  const handleClick = (entry: any, index: number) => {
    dispatch(selectMerchant(index));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    onCellClick(entry, index);
  };

  return (
    <ResponsiveContainer>
      <PieChart>
        <Pie
          activeIndex={selectedIndex}
          activeShape={renderActiveShape}
          data={data}
          cx='50%'
          cy='50%'
          innerRadius={65}
          outerRadius={80}
          fill='#8884d8'
          dataKey='value'
          paddingAngle={4}
          cornerRadius={5}
          style={{ outline: 'none' }}
          onClick={handleClick}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              style={{ outline: 'none' }}
              onClick={() => handleClick(entry, index)}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RechartPieChart;

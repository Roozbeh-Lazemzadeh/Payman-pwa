// // RechartPieChart.tsx

// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
// import './style.css';
// import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
// import {
//   selectMerchant,
//   selectSelectedMerchant,
// } from '../../store/chart/chartSlice';
// interface RechartPieChartProps {
//   data: Array<{ name: string; value: number }>;
// }

// const RechartPieChart: React.FC<RechartPieChartProps> = ({ data }) => {
//   const activeIndex = useAppSelector(selectSelectedMerchant);
//   const dispatch = useAppDispatch();
//   const renderActiveShape = (props: any) => {
//     const { cx, cy, innerRadius, startAngle, endAngle, fill, percent } = props;
//     return (
//       <g>
//         <text
//           className='chart-text'
//           x={cx}
//           y={cy}
//           dy={8}
//           textAnchor='middle'
//           fill={fill}
//         >
//           {`%${
//             activeIndex !== data.length ? (percent * 100).toFixed(0) : '100'
//           }`}
//         </text>
//         <Sector
//           cx={cx}
//           cy={cy}
//           innerRadius={innerRadius}
//           outerRadius={activeIndex !== 1000 ? 90 : 80}
//           startAngle={startAngle}
//           endAngle={endAngle}
//           fill={fill}
//           cornerRadius={5}
//           style={{ outline: 'none' }}
//         />
//       </g>
//     );
//   };
//   const generateChartData = () => {
//     if (!data || data.length === 0) {
//       return [];
//     }

//     return data.map((entry, index) => ({
//       ...entry,
//       color: COLORS[index % COLORS.length],
//     }));
//   };

//   const COLORS = ['#00E261', '#FF683B', '#FFAA1B', '#bbb'];
//   // const COLORS = ['#00E261', '#FF683B', '#FFAA1B', '#bbb'];

//   // const generateRandomColors = (length: number) => {
//   //   const colors = [];
//   //   for (let i = 0; i < length; i++) {
//   //     const randomColor =
//   //       '#' + Math.floor(Math.random() * 16777215).toString(16);
//   //     colors.push(randomColor);
//   //   }
//   //   return COLORS;
//   // };

//   const chartData = generateChartData();

//   const handleClick = (entry: any, index: number) => {
//     dispatch(selectMerchant(index));
//   };

//   return (
//     <ResponsiveContainer>
//       <PieChart>
//         <Pie
//           activeIndex={activeIndex}
//           activeShape={renderActiveShape}
//           data={chartData}
//           cx='50%'
//           cy='50%'
//           innerRadius={65}
//           outerRadius={80}
//           fill='#8884d8'
//           dataKey='value'
//           // onMouseEnter={onPieEnter}
//           paddingAngle={4}
//           cornerRadius={5}
//           style={{ outline: 'none' }}
//         >
//           {data.map((entry, index) => (
//             <Cell
//               key={`cell-${index}`} // Assigning unique key
//               fill={COLORS[index % COLORS.length]}
//               style={{ outline: 'none' }}
//               onClick={() => handleClick(entry, index)}
//             />
//           ))}
//         </Pie>
//       </PieChart>
//     </ResponsiveContainer>
//   );
// };

// export default RechartPieChart;

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import './style.css';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import {
  selectMerchant,
  selectSelectedMerchant,
} from '../../store/chart/chartSlice';

interface RechartPieChartProps {
  data: Array<{ name: string; value: number; color: string }>;
  selectedIndex?: number;
}

const RechartPieChart: React.FC<RechartPieChartProps> = ({
  data,
  selectedIndex,
}) => {
  const dispatch = useAppDispatch();
  const activeIndex = useAppSelector(selectSelectedMerchant);
 console.log('activeIndex', activeIndex);
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
          {`%${
            selectedIndex !== data.length ? (percent * 100).toFixed(0) : '100'
          }`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={selectedIndex !== 1000 ? 90 : 80}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          cornerRadius={5}
          style={{ outline: 'none' }}
        />
      </g>
    );
  };

  const handleClick = (entry: any, index: number) => {
    dispatch(selectMerchant(index));
    dispatch(selectMerchant(activeIndex));
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

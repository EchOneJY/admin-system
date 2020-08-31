import React, { FC } from 'react';

import BarChartComponent from './bar';
import LineChartComponent from './line';
import PieChartComponent from './pie';
import ScatterChartComponent from './scatter';

interface ChartComponentProps {
  type: string;
}

const ChartComponent: FC<ChartComponentProps> = props => {
  const { type } = props;
  {
    if (type === 'bar') return <BarChartComponent />;
    if (type === 'line') return <LineChartComponent />;
    if (type === 'pie') return <PieChartComponent />;
    if (type === 'scatter') return <ScatterChartComponent />;
  }
  return <BarChartComponent />;
};

export default ChartComponent;

import React, { useState } from 'react';
import { Radio } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';

import ChartComponent from './components';
import './style.less';

const chartList = [
  {
    label: 'Bar',
    value: 'bar',
  },
  {
    label: 'Line',
    value: 'line',
  },
  {
    label: 'Pie',
    value: 'pie',
  },
  {
    label: 'Scatter',
    value: 'scatter',
  },
];

const Echart = () => {
  const [type, setType] = useState('bar');
  const handleRadioGroupChange = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  return (
    <div className="echart-wrapper">
      <Radio.Group
        options={chartList}
        defaultValue={type}
        onChange={handleRadioGroupChange}
        optionType="button"
      />
      <div className="chart">
        <ChartComponent type={type} />
      </div>
    </div>
  );
};

export default Echart;

import React from 'react';
import classNames from 'classnames';
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';

import styles from './pages.less';
import Color from '@/utils/themes';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const Pages = () => {
  return (
    <div className={styles.pages}>
      <div className={styles.title}>Pages Record</div>
      <ResponsiveContainer minHeight={360}>
        <LineChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={Color.borderBase}
          />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: Color.borderBase, strokeWidth: 1 }}
            tickLine={false}
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip
            wrapperStyle={{
              border: 'none',
              boxShadow: '4px 4px 40px rgba(0, 0, 0, 0.05)',
            }}
            content={(content: TooltipProps) => {
              const { payload, label } = content;
              const list =
                payload &&
                payload.map((item, key) => (
                  <li key={key} className={styles.tipitem}>
                    <span
                      className={styles.radiusdot}
                      style={{ background: item.color }}
                    />
                    {`${item.name}:${item.value}`}
                  </li>
                ));
              return (
                <div className={styles.tooltip}>
                  <p className={styles.tiptitle}>{label}</p>
                  {payload && <ul>{list}</ul>}
                </div>
              );
            }}
          />
          <Legend
            verticalAlign="top"
            content={prop => {
              const { payload } = prop;
              return (
                <ul
                  className={classNames({
                    [styles.legend]: true,
                    clearfix: true,
                  })}
                >
                  {payload &&
                    payload.map((item, key) => (
                      <li key={key}>
                        <span
                          className={styles.radiusdot}
                          style={{ background: item.color }}
                        />
                        {item.value}
                      </li>
                    ))}
                </ul>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="pv"
            stroke={Color.purple}
            strokeWidth={3}
            dot={{ fill: Color.purple }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="uv"
            stroke={Color.red}
            strokeWidth={3}
            dot={{ fill: Color.red }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="amt"
            stroke={Color.green}
            strokeWidth={3}
            dot={{ fill: Color.green }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Pages;

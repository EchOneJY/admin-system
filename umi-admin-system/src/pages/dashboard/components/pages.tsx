import React, { FC } from 'react';
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
import { PageType } from '../data';

interface PagesProps {
  data: PageType[];
}

const Pages: FC<PagesProps> = props => {
  const { data } = props;

  const namesIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const formatData = data.map(item => {
    item.name = 'Page' + namesIndex[item.nameIndex];
    return item;
  });

  return (
    <div className={styles.pages}>
      <div className={styles.title}>Pages Record</div>
      <ResponsiveContainer minHeight={360}>
        <LineChart
          width={730}
          height={250}
          data={formatData}
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

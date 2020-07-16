import React, { FC } from 'react';
import { Card } from 'antd';
import CountUp from 'react-countup';

import { iconConfig, IconKey } from '@/utils/icon';
import styles from './numberCard.less';

interface NumberCardType {
  icon: IconKey;
  color: string;
  title: string;
  number: number;
  countUp?: object;
}
const NumberCard: FC<NumberCardType> = props => {
  const { icon, color, title, number, countUp } = props;
  const IconComponent = iconConfig[icon];
  return (
    <Card
      className={styles.numberCard}
      bordered={false}
      bodyStyle={{ padding: 10 }}
      hoverable
    >
      <IconComponent className={styles.iconWarp} style={{ color }} />
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>
          <CountUp
            start={0}
            end={number}
            duration={2.75}
            useEasing
            separator=","
            {...(countUp || {})}
          />
        </p>
      </div>
    </Card>
  );
};

export default NumberCard;

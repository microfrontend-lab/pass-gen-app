import clsx from 'clsx';
import { Text } from '@/components/ui';
import type { PasswordStrength } from '@/types/password';
import styles from './StrengthMeter.module.css';

export interface StrengthMeterProps {
  strength: PasswordStrength;
}

const LEVELS: PasswordStrength[] = ['weak', 'medium', 'strong'];

export function StrengthMeter({ strength }: StrengthMeterProps) {
  const filled = LEVELS.indexOf(strength) + 1;

  return (
    <div className={styles.container}>
      <Text size="sm" muted>
        Strength
      </Text>
      <div className={styles.row}>
        <Text size="sm" className={clsx(styles.label, styles[strength])}>
          {strength}
        </Text>
        <div className={styles.bars}>
          {LEVELS.map((level, index) => (
            <span key={level} className={clsx(styles.bar, index < filled && styles[strength])} />
          ))}
        </div>
      </div>
    </div>
  );
}

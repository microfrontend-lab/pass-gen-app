import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={clsx(styles.row, className)}>
      <input type="checkbox" className={styles.input} {...rest} />
      <span>{label}</span>
    </label>
  );
}

import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';
import styles from './Slider.module.css';

export type SliderProps = InputHTMLAttributes<HTMLInputElement>;

export function Slider({ className, ...rest }: SliderProps) {
  return <input type="range" className={clsx(styles.slider, className)} {...rest} />;
}

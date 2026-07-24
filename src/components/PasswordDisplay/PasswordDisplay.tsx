import { useEffect, useState } from 'react';
import { Card } from '@/components/ui';
import styles from './PasswordDisplay.module.css';

export interface PasswordDisplayProps {
  password: string;
}

export function PasswordDisplay({ password }: PasswordDisplayProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    await navigator.clipboard.writeText(password);
    setCopied(true);
  }

  return (
    <Card className={styles.card}>
      <span className={styles.password}>{password}</span>
      <span className={styles.actions}>
        {copied && <span className={styles.copied}>Copied</span>}
        <button
          type="button"
          className={styles.copyButton}
          onClick={handleCopy}
          aria-label="Copy password to clipboard"
        >
          Copy
        </button>
      </span>
    </Card>
  );
}

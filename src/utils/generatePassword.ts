import type { PasswordOptions } from '@/types/password';

const CHARSETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const;

const CHARSET_KEYS = Object.keys(CHARSETS) as (keyof typeof CHARSETS)[];

function randomInt(max: number): number {
  const value = new Uint32Array(1);
  crypto.getRandomValues(value);
  return (value[0] as number) % max;
}

function randomChar(pool: string): string {
  return pool[randomInt(pool.length)] as string;
}

function shuffle(chars: string[]): string[] {
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    const a = chars[i] as string;
    const b = chars[j] as string;
    chars[i] = b;
    chars[j] = a;
  }
  return chars;
}

export function generatePassword(options: PasswordOptions): string {
  const selectedKeys = CHARSET_KEYS.filter((key) => options[key]);
  const pools = selectedKeys.length > 0 ? selectedKeys.map((key) => CHARSETS[key]) : [CHARSETS.lowercase];
  const charset = pools.join('');

  // Guarantee at least one character from each selected pool when the
  // requested length allows it, then fill the rest uniformly and shuffle so
  // the guaranteed characters aren't predictably placed at the front.
  const guaranteed = pools.length <= options.length ? pools.map(randomChar) : [];
  const remaining = Array.from({ length: options.length - guaranteed.length }, () => randomChar(charset));

  return shuffle([...guaranteed, ...remaining]).join('');
}

import { usePasswordGenerator } from '@/hooks/usePasswordGenerator';
import { PasswordDisplay } from '@/components/PasswordDisplay';
import { StrengthMeter } from '@/components/StrengthMeter';
import { Button, Card, Checkbox, Slider, Text } from '@/components/ui';
import styles from './PasswordGeneratorPage.module.css';

const MIN_LENGTH = 4;
const MAX_LENGTH = 32;

export default function PasswordGeneratorPage() {
  const { password, options, strength, regenerate, setLength, toggleOption } =
    usePasswordGenerator();

  return (
    <div className={styles.page}>
      <Text as="h1" size="xl">
        Password Generator
      </Text>

      <PasswordDisplay password={password} />

      <Card className={styles.options}>
        <div className={styles.lengthRow}>
          <Text size="sm">Character length</Text>
          <Text size="lg" className={styles.lengthValue}>
            {options.length}
          </Text>
        </div>
        <Slider
          min={MIN_LENGTH}
          max={MAX_LENGTH}
          value={options.length}
          onChange={(event) => setLength(Number(event.target.value))}
          aria-label="Character length"
        />

        <div className={styles.checkboxes}>
          <Checkbox
            label="Include Uppercase Letters"
            checked={options.uppercase}
            onChange={() => toggleOption('uppercase')}
          />
          <Checkbox
            label="Include Lowercase Letters"
            checked={options.lowercase}
            onChange={() => toggleOption('lowercase')}
          />
          <Checkbox
            label="Include Numbers"
            checked={options.numbers}
            onChange={() => toggleOption('numbers')}
          />
          <Checkbox
            label="Include Symbols"
            checked={options.symbols}
            onChange={() => toggleOption('symbols')}
          />
        </div>

        <StrengthMeter strength={strength} />

        <Button className={styles.generateButton} onClick={regenerate}>
          Generate
        </Button>
      </Card>
    </div>
  );
}

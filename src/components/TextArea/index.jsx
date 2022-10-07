/* eslint-disable no-console */
import clsx from 'clsx';
import React, {
  useState, useCallback, useRef, useEffect,
} from 'react';
import * as styles from './index.module.scss';

const isNumber = (value) => !Number.isNaN(Number(value));

/**
 * Basic textarea component of the CroCoder component library.
 */
const TextArea = ({
  className,
  disabled = false,
  showCharCount = false,
  manualResize = 'none',
  error = false,
  errorMessage,
  fluidHeight = false,
  fluidHeightOptions = Object({
    minRows: 3,
    maxRows: Infinity,
    lineHeight: 18,
  }),
  id,
  label,
  maxLength,
  onChange,
  required = false,
  style,
  testId,
  value,
}) => {
  const { minRows, maxRows, lineHeight } = fluidHeightOptions;

  const [empty, setEmpty] = useState(!value);
  const [charCount, setCharCount] = useState(0);
  const [heightStyle, setHeightStyle] = useState(
    fluidHeight
      ? {
        height: `${minRows * lineHeight}px`,
        lineHeight: `${lineHeight}px`,
        resize: manualResize,
        previousHeight: 0,
      }
      : { resize: manualResize },
  );

  const maximumCharachtersLength = showCharCount && !maxLength ? 500 : maxLength;

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    if (fluidHeight) {
      if (!minRows) {
        console.warn(
          'fluidHeight is set to true but fluidHeightOptions.minRows is missing',
        );
      }
      if (!maxRows) {
        console.warn(
          'fluidHeight is set to true but fluidHeightOptions.maxRows is missing',
        );
      }
      if (!lineHeight) {
        console.warn(
          'fluidHeight is set to true but fluidHeightOptions.lineHeight is missing',
        );
      }

      if (!isNumber(minRows)) {
        console.warn('fluidHeightOptions.minRows should be a number');
      }
      if (!isNumber(maxRows)) {
        console.warn('fluidHeightOptions.maxRows should be a number');
      }
      if (!isNumber(lineHeight)) {
        console.warn('fluidHeightOptions.lineHeight should be a number');
      }
      if (minRows > maxRows) {
        console.warn(
          'fluidHeightOptions.maxRows should be greater or equal fluidHeightOptions.minRows',
        );
      }
    }
  }, [fluidHeight, minRows, maxRows, lineHeight]);

  const textAreaRef = useRef();

  const calculateAndSetHeight = useCallback(
    (shouldIRun) => {
      const currentHeight = textAreaRef.current.scrollHeight;
      if (!shouldIRun && currentHeight === heightStyle.previousHeight) return;

      const rows = Math.max(
        Math.floor(textAreaRef.current.scrollHeight / lineHeight),
        minRows,
      );

      const height = `${(rows > maxRows ? maxRows : rows) * lineHeight}px`;

      setHeightStyle(() => {
        if (fluidHeight) {
          return {
            height,
            previousHeight: currentHeight,
            lineHeight: `${lineHeight}px`,
            resize: manualResize,
          };
        }
        return { resize: manualResize };
      });
    },
    [
      heightStyle.previousHeight,
      lineHeight,
      minRows,
      maxRows,
      fluidHeight,
      manualResize,
    ],
  );

  useEffect(() => {
    calculateAndSetHeight(true);
  }, [calculateAndSetHeight]);

  const handleChange = useCallback(
    (e) => {
      setEmpty(e.target.value.length === 0);
      setCharCount(e.target.value.length);

      if (fluidHeight) {
        calculateAndSetHeight();
      }

      if (onChange) onChange(e);
    },
    [onChange, fluidHeight, calculateAndSetHeight],
  );

  return (
    <div
      style={style}
      className={clsx(className, styles.textarea__wrapper, {
        [styles.error]: error,
        [styles.empty]: empty,
      })}
    >
      <label htmlFor={id} className={styles.textarea__label}>
        {label}
        {' '}
        {required && '*'}
      </label>
      <textarea
        ref={textAreaRef}
        disabled={disabled}
        onChange={handleChange}
        aria-label={label}
        id={id}
        placeholder={label}
        maxLength={maximumCharachtersLength}
        className={styles.textarea}
        style={{
          height: heightStyle.height,
          lineHeight: heightStyle.lineHeight,
        }}
        testid={testId}
      />
      <div className={styles.textarea__messages}>
        {errorMessage && error && (
          <span title={errorMessage} className={styles.message}>
            {errorMessage}
          </span>
        )}
        {showCharCount && (
          <span
            className={styles.textarea__charCounter}
          >
            {`${charCount}/${maximumCharachtersLength}`}

          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea;

import React, { useState, useCallback } from 'react';
import FieldLayout from '../FieldLayout';
import * as styles from './index.module.scss';
/**
 * Basic input component of the CroCoder component library
 */
const Input = ({
  className,
  defaultValue,
  disabled = false,
  error,
  errorMessage,
  id,
  hideLabelOnFocus,
  label,
  maxLength,
  onChange,
  required,
  style,
  testId,
  title,
  type,
  value,
}) => {
  const [empty, setEmpty] = useState(!value && !defaultValue);

  const handleChange = useCallback(
    (e) => {
      setEmpty(e.target.value.length === 0);
      if (onChange) onChange(e);
    },
    [onChange],
  );

  return (
    <FieldLayout
      style={style}
      error={error}
      errorMessage={errorMessage}
      labelHtmlFor={id}
      empty={empty}
      label={label}
      required={required}
      className={className}
      hideLabelOnFocus={hideLabelOnFocus}
    >
      <input
        id={id}
        testid={testId}
        title={title}
        defaultValue={defaultValue}
        disabled={disabled}
        maxLength={maxLength}
        onChange={handleChange}
        type={type}
        placeholder={label}
        className={styles.input}
      />
    </FieldLayout>
  );
};

export default Input;

import React, { useState, useRef, useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import omit from 'omit.js';
import classNames from 'classnames';
import styles from './Default.less';

export default ({
  form,
  name,
  label,
  valuePropName,
  extra,
  customProps = {},
  component,
  errors,
  dependencies,
  asyncValidator,
  noStyle,
  normalize,
  ...props
}) => {
  const [focus, setFocus] = useState(false);
  const [help, setHelp] = useState({
    visible: false,
    content: null,
    ...props.help,
  });

  const rules = useRef((props.rules || []).concat());
  const prevValue = useRef();
  const validatorErrors = useRef();
  const fieldErrors = useRef();
  const valueIsChange = useRef(false);

  useEffect(() => {
    const value = form.getFieldValue(name);
    if (value && value !== '') {
      prevValue.current = value;
      form.setFields([
        {
          name,
          touched: true,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    fieldErrors.current = errors;
    if (Array.isArray(errors) ? errors.length > 0 : errors) {
      form.validateFields([name]);
    }
  }, [errors]);

  useEffect(() => {
    setHelp({ ...help, ...props.help });
  }, [props.help]);

  const getValue = () => {
    return form.getFieldValue(name);
  };

  const renderHelp = () => {
    const { visible } = help;
    let { content } = help;
    if (!visible) return null;
    const currentErros = form.getFieldError(name);
    content = typeof content === 'function' ? content(form.getFieldValue(name)) : content;

    return content || (currentErros && currentErros.length > 0 ? currentErros : null);
  };

  const hasFeedback = () => {
    let propHasFeedback = props.hasFeedback;
    propHasFeedback = propHasFeedback === undefined || propHasFeedback;
    return form.isFieldValidating(name) || !focus ? propHasFeedback : false;
  };

  const onValueIsChange = (value) => {
    if (prevValue.current === value) valueIsChange.current = false;
    else {
      valueIsChange.current = true;
    }
  };

  const handleFocus = (e) => {
    const value = getValue(e);
    const error = form.getFieldError(name);
    if (error && error.length > 0) {
      form.setFields([
        {
          name: [name],
          value,
          errors: null,
        },
      ]);
    }
    const propHelp = props.help;
    const { onFocus } = props;
    const { trigger = 'focus' } = propHelp || {};
    setFocus(true);
    if (trigger === 'focus') setHelp({ ...propHelp, visible: true });
    if (trigger === 'blur') setHelp({ ...propHelp, visible: false, content: null });
    onValueIsChange(value);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    const value = getValue(e);
    const propHelp = props.help;
    const { onBlur } = props;
    const { trigger = 'focus' } = propHelp || {};
    setFocus(false);
    if (trigger === 'focus') setHelp({ ...propHelp, visible: false, content: null });
    if (trigger === 'blur') setHelp({ ...propHelp, visible: true });
    prevValue.current = value;
    e.change = valueIsChange.current;
    valueIsChange.current = false;
    if (onBlur) onBlur(e);
  };

  const handleChange = (e) => {
    const { onChange } = props;
    const { content } = props.help || {};
    const { visible } = help;
    if (visible) setHelp({ ...help, content });
    const value = getValue(e);
    onValueIsChange(value);
    if (onChange) onChange(e);
  };

  const doAsyncValidator = (rule, value, cb, source, options) => {
    let hasError = false;
    for (let i = 0; i < rules.current.length; i += 1) {
      const r = rules.current[i];
      let ruleError = false;
      if (!r.asyncValidator) {
        rule.validator(
          {
            ...r,
            fullField: rule.fullField,
            field: rule.field,
            type: rule.type,
            validator: rule.validator,
          },
          value,
          (error) => {
            if (error && error.length > 0) {
              ruleError = true;
            }
          },
          source,
          options,
        );
      }
      hasError = ruleError;
      if (hasError) break;
    }
    if (!hasError) {
      if (!valueIsChange.current)
        return validatorErrors.current
          ? Promise.reject(validatorErrors.current)
          : Promise.resolve();

      return new Promise((resolve, reject) => {
        asyncValidator(rule, value)
          .then(() => {
            validatorErrors.current = null;
            resolve();
          })
          .catch((message) => {
            validatorErrors.current = message;
            reject(message);
          });
      });
    }
    return undefined;
  };

  const doErrorValidator = () => {
    if (fieldErrors.current && !valueIsChange.current) return Promise.reject(fieldErrors.current);
    fieldErrors.current = null;
    return Promise.resolve();
  };

  const { validateFirst, validateTrigger, onBlur, onChange, onFocus, ...restProps } = omit(props, [
    'help',
    'rules',
    'hasFeedback',
  ]);

  const otherProps = restProps || {};
  if (asyncValidator && !rules.current.find((rule) => rule.validatorType === 'asyncValidator')) {
    rules.current.push({
      validatorType: 'asyncValidator',
      asyncValidator: doAsyncValidator,
    });
  }

  if (!rules.current.find((rule) => rule.validatorType === 'errorValidator')) {
    rules.current.push({
      validatorType: 'errorValidator',
      validator: doErrorValidator,
    });
  }

  let canFeedback = true;
  let isHidden = false;
  const renderComponent = (childComponent) => {
    let child = childComponent;
    if (!child) child = Input;
    if (typeof child !== 'object') {
      const Componet = child;
      child = <Componet />;
    }
    canFeedback = child.type === Input || child.type === Select;

    child = React.cloneElement(child, {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange: handleChange,
      ...customProps,
      ...otherProps,
    });

    const { type } = child.props;
    isHidden = type === 'hidden';
    canFeedback = isHidden ? false : canFeedback;

    return child;
  };

  const children = renderComponent(component);
  return (
    <Form.Item
      className={classNames({
        [styles.hidden]: isHidden,
      })}
      valuePropName={valuePropName}
      name={name}
      label={label}
      help={renderHelp()}
      hasFeedback={canFeedback ? hasFeedback() : false}
      extra={extra}
      rules={rules.current}
      validateFirst={validateFirst || true}
      validateTrigger={validateTrigger || 'onBlur'}
      dependencies={dependencies}
      noStyle={noStyle}
      normalize={normalize}
    >
      {children}
    </Form.Item>
  );
};

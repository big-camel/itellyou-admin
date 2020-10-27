import React, { useImperativeHandle } from 'react';
import omit from 'omit.js'
import Form from '@/components/Form';

const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

export default React.forwardRef(({ initialValues, visible, onCancel , onSubmit = function(){} , items , loading , update , primaryKey  , ...props },ref) => {

  const [form] = Form.useForm(props.form);
  const onFormSubmit = async () => {
    const fieldsValue = await form.validateFields();
    const updateValues = {};
    Object.keys(fieldsValue).forEach(field => {
        if (fieldsValue[field] !== initialValues[field]) {
            updateValues[field] = fieldsValue[field];
        }
    });

    onSubmit(update ? updateValues : fieldsValue,primaryKey ? initialValues[primaryKey] : undefined,fieldsValue,initialValues)
  };

  useImperativeHandle(ref, () => ({
    onSubmit:onFormSubmit
  }))
  
  return (
      <Form
        {...formLayout}
        form={form}
        initialValues={initialValues}
        {...omit(props,["form"])}
      >
      {
        items.map(item => item)
      }
      </Form>
  );
});

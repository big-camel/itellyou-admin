import React, { useState } from 'react';
import { Modal } from 'antd';
import Form from '@/components/Form';
import formMap from './map';

const { Action, Type, Number, Remark, OnlyOnce } = Form.createItem(formMap);

const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const UpdateForm = ({ values, modalVisible, onCancel, ...props }) => {
  const [form] = Form.useForm();

  const {
    action,
    type,
    targeter_step,
    creater_step,
    creater_min_score,
    creater_count_of_day,
    creater_count_of_month,
    creater_count_of_week,
    creater_total_of_day,
    creater_total_of_month,
    creater_total_of_week,
    creater_remark,
    targeter_count_of_day,
    targeter_count_of_month,
    targeter_count_of_week,
    targeter_total_of_day,
    targeter_total_of_month,
    targeter_total_of_week,
    targeter_remark,
    only_once,
  } = values || {};
  const [formVals, setFormVals] = useState({
    action,
    type,
    targeter_step,
    creater_step,
    creater_min_score,
    creater_count_of_day,
    creater_count_of_month,
    creater_count_of_week,
    creater_total_of_day,
    creater_total_of_month,
    creater_total_of_week,
    creater_remark,
    targeter_count_of_day,
    targeter_count_of_month,
    targeter_count_of_week,
    targeter_total_of_day,
    targeter_total_of_month,
    targeter_total_of_week,
    targeter_remark,
    only_once,
  });

  const onSubmit = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    if (props.onSubmit) {
      props.onSubmit(fieldsValue);
    }
  };

  return (
    <Modal
      width={640}
      destroyOnClose
      title="修改权限"
      visible={modalVisible}
      onCancel={onCancel}
      onOk={onSubmit}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          action,
          type,
          targeter_step,
          creater_step,
          creater_min_score,
          creater_count_of_day,
          creater_count_of_month,
          creater_count_of_week,
          creater_total_of_day,
          creater_total_of_month,
          creater_total_of_week,
          creater_remark,
          targeter_count_of_day,
          targeter_count_of_month,
          targeter_count_of_week,
          targeter_total_of_day,
          targeter_total_of_month,
          targeter_total_of_week,
          targeter_remark,
          only_once,
        }}
        {...props.form}
      >
        <Action name="action" disabled />
        <Type name="type" disabled />
        <Number label="目标加分" name="targeter_step" />
        <Number label="操作加分" name="creater_step" />
        <Number label="最低有效分" name="creater_min_score" min={0} />
        <Number label="目标每日次数" name="targeter_count_of_day" min={0} />
        <Number label="目标每日额度" name="targeter_total_of_day" min={0} />
        <Number label="目标每周次数" name="targeter_count_of_week" min={0} />
        <Number label="目标每周额度" name="targeter_total_of_week" min={0} />
        <Number label="目标每月次数" name="targeter_count_of_month" min={0} />
        <Number label="目标每月额度" name="targeter_total_of_month" min={0} />
        <Number label="操作每日次数" name="creater_count_of_day" />
        <Number label="操作每日额度" name="creater_total_of_day" min={0} />
        <Number label="操作每周次数" name="creater_count_of_week" min={0} />
        <Number label="操作每周额度" name="creater_total_of_week" min={0} />
        <Number label="操作每月次数" name="creater_count_of_month" min={0} />
        <Number label="操作每月额度" name="creater_total_of_month" min={0} />
        <Remark label="目标备注" name="targeter_remark" />
        <Remark label="操作备注" name="creater_remark" />
        <OnlyOnce label="仅一次有效" name="only_once" />
      </Form>
    </Modal>
  );
};

export default UpdateForm;

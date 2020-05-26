import React, { useState, useEffect } from 'react';
import { message, Row, Col } from 'antd';
import Form, { Submit } from '@/components/Form';
import formMap from './map';
import { query, edit } from '../service';

const {
  Name,
  Logo,
  IcpText,
  Copyright,
  CompanyName,
  UserAgreementLink,
  FooterScripts,
} = Form.createItem(formMap);

const formLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};

export default () => {
  const [form] = Form.useForm();

  const [formVals, setFormVals] = useState({});
  const [submiting, setSubmiting] = useState(false);

  useEffect(() => {
    query().then(({ result, data }) => {
      if (result) {
        setFormVals(data);
        form.setFieldsValue(data);
      }
    });
  }, [query, form]);

  const onSubmit = () => {
    if (submiting) return;
    setSubmiting(true);
    form.validateFields().then((fieldsValue) => {
      const update = {
        key: 'default',
      };

      Object.keys(fieldsValue).forEach((p) => {
        if (fieldsValue[p] !== formVals[p]) {
          update[p] = fieldsValue[p];
        }
      });
      edit(update).then(({ result, ...res }) => {
        if (result) message.success('修改成功');
        else message.error(res.message);
        setSubmiting(false);
      });
    });
  };

  return (
    <Form
      {...formLayout}
      form={form}
      initialValues={{
        ...formVals,
      }}
      onSubmit={onSubmit}
    >
      <Name name="name" />
      <Logo name="logo" />
      <IcpText name="icp_text" />
      <Copyright name="copyright" />
      <CompanyName name="company_name" />
      <UserAgreementLink name="user_agreement_link" />
      <FooterScripts name="footer_scripts" />
      <Row>
        <Col span={4} />
        <Col span={20}>
          <Submit loading={submiting}>提交修改</Submit>
        </Col>
      </Row>
    </Form>
  );
};

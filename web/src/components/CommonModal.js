import React from "react";
import { Modal, Form, Row, Col, Input, Select } from "antd";

const CommonModal = ({title,visible,onCancel,onOk,form,currentRecord,fields,readOnly = false,width = "80%",
}) => {
  const modalFormLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  // 动态渲染表单项的函数
  const renderFieldComponent = (field) => {
    switch (field.type) {
      case "text":
        return <Input />;
      case "textarea":
        return <Input.TextArea rows={4} />;
      case "select":
        return (
          <Select>
            {field.options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );
      default:
        return <Input />;
    }
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      width={width}
      footer={readOnly ? null : undefined}
      okText="确定"
      cancelText="取消"
    >
      {currentRecord && (
        <Form {...modalFormLayout} form={form}>
          {fields.map((field, index) => {
            if (index % 2 === 0) {
              return (
                <Row gutter={5} key={index}>
                  <Col span={12}>
                    <Form.Item
                      label={fields[index].label}
                      name={fields[index].name}
                      rules={fields[index].rules}
                    >
                      {readOnly ? (
                        <span>{currentRecord[fields[index].name]}</span>
                      ) : (
                        renderFieldComponent(fields[index])
                      )}
                    </Form.Item>
                  </Col>
                  {fields[index + 1] && (
                    <Col span={12}>
                      <Form.Item
                        label={fields[index + 1].label}
                        name={fields[index + 1].name}
                        rules={fields[index + 1].rules}
                      >
                        {readOnly ? (
                          <span>{currentRecord[fields[index + 1].name]}</span>
                        ) : (
                          renderFieldComponent(fields[index + 1])
                        )}
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              );
            }
            return null;
          })}
        </Form>
      )}
    </Modal>
  );
};

export default CommonModal;


import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, message } from "antd";
import axios from "axios";

export const PatientModal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const successMessage = (method) => {
    let interpolate;
    if (method == "patch") {
      interpolate = "updated";
    } else {
      interpolate = "added";
    }
    messageApi.success(`Successfully ${interpolate} patient!`);
  };

  const errorMessage = (err) => {
    messageApi.error(`Error when adding new patient: \n ${err} `);
  };

  const [patient, setPatient] = useState(
    props.data || {
      first_name: "",
      middle_name: "",
      last_name: "",
      dob: "",
      status: "",
      street_address: "",
      postal_code: "",
      city: "",
      province: "",
      country: "",
    }
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeFirstName = (e) => {
    setPatient({
      ...patient,
      first_name: e.target.value,
    });
  };

  const handleChangeMiddleName = (e) => {
    setPatient({
      ...patient,
      middle_name: e.target.value,
    });
  };

  const handleChangeLastName = (e) => {
    setPatient({
      ...patient,
      last_name: e.target.value,
    });
  };

  const handleChangeDOB = (e) => {
    setPatient({
      ...patient,
      dob: e.target.value,
    });
  };

  const handleChangeStreetAddress = (e) => {
    setPatient({
      ...patient,
      street_address: e.target.value,
    });
  };

  const handleChangePostalCode = (e) => {
    setPatient({
      ...patient,
      postal_code: e.target.value,
    });
  };

  const handleChangeCity = (e) => {
    setPatient({
      ...patient,
      city: e.target.value,
    });
  };

  const handleChangeProvince = (e) => {
    setPatient({
      ...patient,
      province: e.target.value,
    });
  };

  const handleChangeCountry = (e) => {
    setPatient({
      ...patient,
      country: e.target.value,
    });
  };

  const handleChangeStatus = (e) => {
    setPatient({
      ...patient,
      status: e.target.value,
    });
  };

  const submitChanges = () => {
    let method;
    let url;

    if (!!props.data) {
      method = "patch";
      url = `http://localhost:3000/api/patients/${patient.id}`;
    } else {
      method = "post";
      url = "http://localhost:3000/api/patients";
    }

    let request = {
      method: method,
      url: url,
      data: patient,
    };

    axios(request)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setIsModalOpen(false);
          if (props.update) {
            props.update(patient);
          }
          setPatient({
            first_name: "",
            middle_name: "",
            last_name: "",
            dob: "",
            status: "",
            street_address: "",
            postal_code: "",
            city: "",
            province: "",
            country: "",
          });
          successMessage(method);
        }
      })
      .catch((err) => {
        console.log(err);
        errorMessage(err);
      });
  };

  return (
    <div style={{ display: "flex" }}>
      {contextHolder}
      <Button type="primary" onClick={showModal} style={{ align: "right" }}>
        {props && props.data ? "Edit Patient" : "Add New Patient"}
      </Button>
      <Modal
        title={props && props.data ? "Edit Patient Record" : "Add New Patient"}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={submitChanges}
        onCancel={handleCancel}
        footer={null}
        destroyOnHidden={true}
      >
        <Form initialValues={patient} preserve={false}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[
              { required: true, message: "Please input your first name." },
              {
                pattern: /^([^0-9]*)$/,
                message: "No numbers are allowed in the first name.",
              },
            ]}
          >
            <Input
              value={patient.first_name}
              onChange={handleChangeFirstName}
            />
          </Form.Item>
          <Form.Item
            label="Middle Name"
            name="middle_name"
            rules={[
              {
                pattern: /^([^0-9]*)$/,
                message: "No numbers are allowed in the middle name.",
              },
            ]}
          >
            <Input
              value={patient.middle_name}
              onChange={handleChangeMiddleName}
            />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[
              { required: true, message: "Please input your last name." },
              {
                pattern: /^([^0-9]*)$/,
                message: "No numbers are allowed in the middle name.",
              },
            ]}
          >
            <Input value={patient.last_name} onChange={handleChangeLastName} />
          </Form.Item>
          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              { required: true, message: "Please input your date of birth." },
              ({ getFieldValue }) => ({
                validator() {
                  let dob = getFieldValue("dob");
                  if (
                    !dob.match(
                      /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
                    )
                  ) {
                    return Promise.reject(
                      new Error("Please enter the date in a YYYY-MM-DD format.")
                    );
                  } else if (new Date(dob) >= new Date()) {
                    return Promise.reject(
                      new Error("The date of birth can not be in the future.")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input value={patient.dob} onChange={handleChangeDOB} />
          </Form.Item>
          <Form.Item
            label="Street Address"
            name="street_address"
            rules={[
              { required: true, message: "Please input your street address." },
            ]}
          >
            <Input
              value={patient.street_address}
              onChange={handleChangeStreetAddress}
            />
          </Form.Item>
          <Form.Item
            label="Postal Code"
            name="postal_code"
            rules={[
              { required: true, message: "Please input your postal code." },
            ]}
          >
            <Input
              value={patient.postal_code}
              onChange={handleChangePostalCode}
            />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city." }]}
          >
            <Input value={patient.city} onChange={handleChangeCity} />
          </Form.Item>
          <Form.Item
            label="Province"
            name="province"
            rules={[{ required: true, message: "Please input your province." }]}
          >
            <Input value={patient.province} onChange={handleChangeProvince} />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[
              { required: true, message: "Please input your country." },
              {
                pattern: /^([^0-9]*)$/,
                message: "No numbers are allowed in the country.",
              },
            ]}
          >
            <Input
              // defaultValue={patient.country}
              value={patient.country}
              onChange={handleChangeCountry}
            />
          </Form.Item>

          <Form.Item label="Status">
            <Radio.Group value={patient.status}>
              <Radio value="Inquiry" onChange={handleChangeStatus}>
                Inquiry
              </Radio>
              <Radio value="Onboarding" onChange={handleChangeStatus}>
                Onboarding
              </Radio>
              <Radio value="Active" onChange={handleChangeStatus}>
                Active
              </Radio>
              <Radio value="Churned" onChange={handleChangeStatus}>
                Churned
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={submitChanges}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

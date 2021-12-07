import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Card, Col, Modal, Row, Button } from "react-bootstrap";
import Input from "../controls/Input";
import instructorService from "../services/instructorService";
import * as Yup from "yup";
const Instructors = (props) => {
  const [instructors, setInstructors] = useState([]);
  const [instructorId, setInstructorId] = useState(0);
  const [modalShow, setModelShow] = useState(false);

  const handleModalClose = () => setModelShow(false);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      gender: 0,
    },
    validationSchema: Yup.object({
      //name: Yup.string().required("Required").min(5, "Must be >= 5"),
      phone: Yup.string()
        .required("Require")
        .min(10, "too short, at least 10 number")
        .matches(phoneRegExp, "Phone number is not valid"),

      email: Yup.string().required("Require").email("Email is not valid"),
    }),
    onSubmit: (values) => {
      console.log(values);
      formSubmitHandler(values);
    },
  });
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    instructorService.list().then((res) => {
      setInstructors(res.data);
    });
  };

  const deleteClickHandler = (e, id) => {
    e.preventDefault();
    instructorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        //toast.warning("A data has been deleted");
        loadData();
      } else {
        //toast.error("Delete failed!");
      }
    });
  };

  const showModalHandler = (e, id) => {
    if (e) e.preventDefault();
    setInstructorId(id);
    if (id === 0) {
      formik.resetForm();
      setModelShow(true);
    } else {
      instructorService.get(id).then((res) => {
        formik.setValues(res.data);
        setModelShow(true);
      });
    }
  };
  const formSubmitHandler = (data) => {
    if (instructorId > 0) {
      instructorService.update(instructorId, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          setModelShow(false);
        }
      });
    } else {
      instructorService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          setModelShow(false);
        }
      });
    }
  };

  return (
    <>
      <div class="container mt-4">
        <Card className="border-primary bt-5px">
          <Card.Header>
            <Row>
              <Col className="col">
                <h3 className="card-title">
                  Instructors <small className="text-muted">list</small>
                </h3>
              </Col>
              <Col className="col-auto">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => showModalHandler(null, 0)}
                >
                  <i className="fas fa-plus"></i> Add
                </button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div className="table-responsive">
              <table className="table table-bordered table-hover mb-0 border-primary">
                <thead className="table-primary border-primary">
                  <tr>
                    <th sftyle={{ width: "50px" }} className="text-center">
                      #
                    </th>
                    <th>Instructor Code</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th style={{ width: "80px" }} className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((instructor, idx) => (
                    <tr key={instructor.id}>
                      <th className="text-center">{idx + 1}</th>
                      <td>{instructor.code}</td>
                      <td>{instructor.firstName}</td>
                      <td>{instructor.lastName}</td>
                      <td>
                        {instructor.gender === 1 ? (
                          <i className="fas fa-male text-success fa-lg"></i>
                        ) : (
                          <i className="fas fa-female text-warning fa-lg"></i>
                        )}{" "}
                      </td>
                      <td>{instructor.phone}</td>
                      <td>{instructor.email}</td>
                      <td className="text-center">
                        <a
                          href="/#"
                          //
                          className="mr-1"
                          onClick={(e) => {
                            showModalHandler(e, instructor.id);
                          }}
                        >
                          <i className="fas fa-edit text-primary"></i>
                        </a>
                        <a
                          href="/#"
                          // onClick={(e) => {
                          //   deleteClickHandler(e, major.id);
                          // }}
                          onClick={(e) => deleteClickHandler(e, instructor.id)}
                        >
                          <i className="fas fa-trash-alt text-danger"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
        {/* <div class="card border-primary bt-5px">
          <div class="card-header">
            <div class="row">
              <div class="col">
                <h3 class="card-title">
                  Instructors <small class="text-muted">list</small>
                </h3>
              </div>
              <div class="col-auto">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                >
                  <i class="fas fa-plus"></i> Add
                </button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered table-hover mb-0 border-primary">
                <thead class="table-primary border-primary">
                  <tr>
                    <th style={{ width: "50px" }} class="text-center">
                      #
                    </th>
                    <th>Student Id</th>
                    <th>Full name</th>
                    <th style={{ width: "50px" }}>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th style={{ width: "80px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th class="text-center">1</th>
                    <td>01-03-9384</td>
                    <td>Trần Minh Tâm</td>
                    <td class="text-center">
                      <i class="fas fa-male text-primary fa-lg"></i>
                    </td>
                    <td>0935875636</td>
                    <td>tamtm@yahoo.com</td>
                    <td class="text-center">
                      <a href="/#">
                        <i class="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#">
                        <i class="fas fa-trash-alt text-danger"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-center">2</th>
                    <td>01-03-9344</td>
                    <td>Nguyễn Thị Thanh</td>
                    <td class="text-center">
                      <i class="fas fa-female text-warning fa-lg"></i>
                    </td>
                    <td>0937938573</td>
                    <td>thanhnt@yahoo.com</td>
                    <td class="text-center">
                      <a href="/#">
                        <i class="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#">
                        <i class="fas fa-trash-alt text-danger"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-center">3</th>
                    <td>01-04-9846</td>
                    <td>Lê Thanh Tuấn</td>
                    <td class="text-center">
                      <i class="fas fa-male text-primary fa-lg"></i>
                    </td>
                    <td>0918373635</td>
                    <td>tuanlt@yahoo.com</td>
                    <td class="text-center">
                      <a href="/#">
                        <i class="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#">
                        <i class="fas fa-trash-alt text-danger"></i>
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th class="text-center">4</th>
                    <td>01-04-8363</td>
                    <td>Đinh La Si</td>
                    <td class="text-center">
                      <i class="fas fa-male text-primary fa-lg"></i>
                    </td>
                    <td>0917628363</td>
                    <td>sidl@yahoo.com</td>
                    <td class="text-center">
                      <a href="/#">
                        <i class="fas fa-edit text-primary"></i>
                      </a>
                      <a href="/#">
                        <i class="fas fa-trash-alt text-danger"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </div>
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="modal-title" id="exampleModalLabel">
              {instructorId > 0 ? "Edit" : "New"} Instructor
            </h5>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <div className="row row-cols-2">
              <div className="col-7">
                <Input
                  //inputRef={majorNameRef}
                  id="txtMajor"
                  type="text"
                  label="Code"
                  maxLength="100"
                  frmField={formik.getFieldProps("code")}
                  err={formik.touched.code && formik.errors.code}
                  errMessage={formik.errors.code}
                />
              </div>
              <div className="col-5"></div>
            </div>

            <div className="row row-cols-2">
              <div className="col-7">
                <Input
                  //inputRef={majorNameRef}
                  id="firstName"
                  type="text"
                  label="Name"
                  maxLength="100"
                  frmField={formik.getFieldProps("firstName")}
                  err={formik.touched.name && formik.errors.name}
                  errMessage={formik.errors.name}
                />
              </div>
              <div className="col-5">
                <Input
                  //inputRef={majorNameRef}
                  id="lastName"
                  type="text"
                  maxLength="100"
                  frmField={formik.getFieldProps("lastName")}
                  err={formik.touched.name && formik.errors.name}
                  errMessage={formik.errors.name}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-3">Gender</div>
              <div className="col-9">
                <div className="custom-control d-inline pe-2">
                  <input
                    id="male"
                    type="radio"
                    value={1}
                    name="gender"
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender.valueOf() === 1}
                    // err={formik.touched.gender && formik.errors.gender}
                    errMessage={formik.errors.gender}
                  />
                  <label className="custom-control-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="custom-control d-inline">
                  <input
                    id="female"
                    type="radio"
                    value={0}
                    name="gender"
                    onChange={formik.handleChange}
                    defaultChecked={formik.values.gender.valueOf() === 0}
                    // err={formik.touched.gender && formik.errors.gender}
                    errMessage={formik.errors.gender}
                  />
                  <label className="custom-control-label" htmlFor="female">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <Input
              //inputRef={majorNameRef}
              id="txtMajor"
              type=""
              label="Phone"
              maxLength="100"
              frmField={formik.getFieldProps("phone")}
              err={formik.touched.phone && formik.errors.phone}
              errMessage={formik.errors.phone}
            />
            <Input
              //inputRef={majorNameRef}
              id="txtMajor"
              type=""
              label="Email"
              maxLength="100"
              frmField={formik.getFieldProps("email")}
              err={formik.touched.email && formik.errors.email}
              errMessage={formik.errors.email}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="button"
              data-bs-dismiss="modal"
              disabled={!formik.dirty || !formik.isValid}
              onClick={() => formik.handleSubmit()}
            >
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Instructors;

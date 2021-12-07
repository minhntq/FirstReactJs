import React, { useState, useEffect, useRef } from "react";
import { Card, Col, Container, Modal, Row, Button } from "react-bootstrap";
import Input from "../controls/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import majorService from "../services/majorServive";
const Major = (props) => {
  const [majors, setMajors] = useState([]);
  const [majorId, setMajorId] = useState(0);
  const [modalShow, setModelShow] = useState(false);

  const handleModalClose = () => setModelShow(false);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required").min(5, "Must be >= 5"),
    }),
    onSubmit: (values) => {
      console.log(values);
      formSubmitHandler(values);
    },
  });

  // const handleModalShow = (e, dataId) => {
  //   if (e) e.preventDefault();
  //   setModelShow(true);
  // };
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    majorService.list().then((res) => {
      setMajors(res.data);
    });
  };
  const majorNameRef = useRef("");

  const deleteClickHandler = (e, id) => {
    e.preventDefault();
    majorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        toast.warning("A data has been deleted");
        loadData();
      } else {
        toast.error("Delete failed!");
      }
    });
  };

  const showModalHandler = (e, id) => {
    if (e) e.preventDefault();
    setMajorId(id);
    if (id === 0) {
      formik.resetForm();
      setModelShow(true);
    } else {
      majorService.get(id).then((res) => {
        formik.setValues(res.data);
        setModelShow(true);
      });
    }
  };
  const formSubmitHandler = (data) => {
    if (majorId > 0) {
      majorService.update(majorId, data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          setModelShow(false);
        }
      });
    } else {
      majorService.add(data).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          setModelShow(false);
        }
      });
    }
  };

  return (
    <>
      <Container className="mt-4">
        <Card className="border-primary bt-5px">
          <Card.Header>
            <Row>
              <Col className="col">
                <h3 className="card-title">
                  Major <small className="text-muted">list</small>
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
                    <th>Major Name</th>
                    <th style={{ width: "80px" }} className="text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {majors.map((major, idx) => (
                    <tr key={major.id}>
                      <th className="text-center">{idx + 1}</th>
                      <td>{major.name}</td>
                      <td className="text-center">
                        <a
                          href="/#"
                          //
                          className="mr-1"
                          onClick={(e) => {
                            showModalHandler(e, major.id);
                          }}
                        >
                          <i className="fas fa-edit text-primary"></i>
                        </a>
                        <a
                          href="/#"
                          // onClick={(e) => {
                          //   deleteClickHandler(e, major.id);
                          // }}
                          onClick={(e) => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this item?"
                              )
                            )
                              deleteClickHandler(e, major.id);
                          }}
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
      </Container>
      <Modal
        show={modalShow}
        onHide={handleModalClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h5 className="modal-title" id="exampleModalLabel">
              {majorId > 0 ? "Edit" : "New"} Major
            </h5>
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={formik.handleSubmit}>
          <Modal.Body>
            <Input
              inputRef={majorNameRef}
              id="txtMajor"
              type="text"
              label="Major"
              maxLength="100"
              frmField={formik.getFieldProps("name")}
              err={formik.touched.name && formik.errors.name}
              errMessage={formik.errors.name}
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
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you wish to change the data of this item?"
                  )
                )
                  formik.handleSubmit();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

      {/* <!-- Modal --> */}
      {/* <div
        className="modal fade"
        id="editModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {major.id > 0 ? "Edit" : "Add"} Major
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <Input
                  inputRef={majorNameRef}
                  id="txtMajor"
                  label="Major Name"
                  defaultValue={major.name}
                />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={btnSaveClickHandler}
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Major;

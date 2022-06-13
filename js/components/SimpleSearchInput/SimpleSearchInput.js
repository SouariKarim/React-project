import React, {useCallback, useState} from 'react';
import {Formik} from "formik";
import Form from "../Form/Form";
import {Col, FormGroup, Row} from "react-bootstrap";
import InputGroup from "../Form/InputGroup";
import {faSearch as SearchIcon} from "@fortawesome/free-solid-svg-icons";
import {Input} from "../Form/Input";
import './SimpleSearchInput.scss';
import Button from "../Buttons/Button";


export default function SimpleSearchInput ({onSubmitSearch}) {

    const [searchButtonClicked, setSearchButtonClicked] = useState(false);


    const onSubmit = useCallback((values) => {
        onSubmitSearch(values);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchButtonClicked, onSubmitSearch]);


    return (
        <div className={"search-input"}>
            <Formik initialValues={{query: ''}} onSubmit={(values) => onSubmit(values)}>
                {({isValid, dirty}) => (
                    <Form>
                        <Row className="justify-content-center align-items-center">
                            <Col xs={12} md={9} className={"mt-3"}>
                                <FormGroup controlId="query">
                                    <InputGroup icon={SearchIcon}>
                                        <Input name={"query"}
                                               type={"text"}
                                               autoComplete={"false"}
                                        />
                                    </InputGroup>
                                </FormGroup>
                            </Col>

                            <Col xs={12} md={3} className={"search-btn-col"}>
                                <Button variant="search" type="submit" style={{height: "50px"}} onClick={() => {
                                    setSearchButtonClicked(true);
                                }}>Rechercher</Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
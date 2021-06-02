import React, { Component } from 'react'
import { FilePicker } from 'react-file-picker';
import { BsX } from "react-icons/bs";
import { Nav, Navbar, Form, Button, Modal, Container, Row, Col } from 'react-bootstrap';
var fileDownload = require('js-file-download');
const parser = require('../Grammar/Grammar')

export default class Main extends Component {

    state = {
        files: [],
        actualFile: '',
        show: false,
        newFileName: "",
        consoleResult : ""
    }

    saveFile = () => {
        if (this.state.files.length === 0) {
            return;
        }
        let downloadFile = this.state.files.filter((value: any, index, arr) => {
            return value.fileName === this.state.actualFile
        })
        fileDownload(downloadFile[0]['fileContent'], downloadFile[0]['fileName']);
    }

    saveAll = () => {
        if (this.state.files.length === 0) {
            return;
        }
        for (const key in this.state.files) {
            fileDownload(this.state.files[key]['fileContent'], this.state.files[key]['fileName']);
        }
    }

    parse = () => {
        if (this.state.files.length === 0) {
            return;
        }
        let downloadFile = this.state.files.filter((value: any, index, arr) => {
            return value.fileName === this.state.actualFile
        })
        const ast= parser.parse(downloadFile[0]['fileContent']);
        this.setState({
            consoleResult : ast
        })
    }

    handleFileChange = file => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e: any) => {
            if (this.state.files.some((a: any) => a.fileName === file.name)) {
                this.setState({
                    actualFile: file.name,
                })
                return;
            }
            try {
                var fileTemp: any = {
                    fileName: file.name,
                    fileContent: e.target.result
                }
                this.setState({
                    files: this.state.files.concat(fileTemp),
                    actualFile: file.name
                });
            } catch (e) {
                console.log(e);
            }
        };
    };

    handleShow = () => {
        this.setState({
            show: !this.state.show,
            newFileName: ""
        })
    }


    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <FilePicker maxSize={2} onChange={this.handleFileChange} onError={errMsg => console.log(errMsg)}>
                                <Button variant="link">Open File</Button>
                            </FilePicker>
                            <Button variant="link" onClick={this.saveFile}>Save File</Button>
                            <Button variant="link" onClick={this.saveAll}>Save All</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="mt-2 px-5">
                    <Nav variant="tabs" defaultActiveKey="/home">
                        {this.state.files.map((e: any) =>
                            <Nav.Item key={e.fileName}>
                                <Nav.Link active={this.state.actualFile === e.fileName} onClick={() => {
                                    if (this.state.files.some((a: any) => a.fileName === e.fileName)) {
                                        this.setState({
                                            actualFile: e.fileName,
                                        })
                                        return;
                                    }
                                }}>{e.fileName}


                                    <BsX className="ml-2"
                                        onClick={() => {
                                            this.setState({
                                                files: this.state.files.filter((value: any, index, arr) => {
                                                    return value.fileName !== e.fileName
                                                })
                                            })
                                            if (this.state.actualFile === e.fileName) {
                                                console.log("ASIES")
                                            }
                                        }} />


                                </Nav.Link>
                            </Nav.Item>)}
                        <Nav.Item>
                            <Nav.Link onClick={() => {
                                this.setState({
                                    show: !this.state.show
                                })
                            }}>+</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="mt-2 px-5">
                    {
                        this.state.actualFile.length > 0 ? (
                            this.state.files.map((e: any) =>
                                this.state.actualFile === e.fileName ? (
                                    <Form.Control key={e.fileName} as="textarea" rows={13} defaultValue={e.fileContent}
                                        onChange={a => {
                                            var fileTemp;
                                            this.setState({
                                                files: this.state.files.map((i: any) => {
                                                    if (i.fileName === e.fileName) {
                                                        fileTemp = {
                                                            fileName: i.fileName,
                                                            fileContent: a.target.value
                                                        }
                                                        return fileTemp
                                                    } else {
                                                        fileTemp = {
                                                            fileName: i.fileName,
                                                            fileContent: i.fileContent
                                                        }
                                                        return fileTemp
                                                    }
                                                })
                                            })
                                        }} />
                                ) : null
                            )
                        ) : <Form.Control as="textarea" rows={15} defaultValue="OPEN OR CREATE A FILE" readOnly/>
                    }
                    <Button variant="primary" className = "mt-2" onClick={this.parse}>Play</Button>
                </div>
                <div className="mt-2 px-5">
                    <Form.Control as="textarea" rows={6} defaultValue={this.state.consoleResult}/>
                </div>

                <Modal show={this.state.show} onHide={this.handleShow}>
                    <Modal.Header closeButton>
                        <Modal.Title>New File</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={e => {
                            e.preventDefault();
                            if (this.state.files.some((a: any) => a.fileName === this.state.newFileName)) {
                                this.setState({
                                    actualFile: this.state.newFileName,
                                    newFileName: "",
                                    show: !this.state.show
                                })
                                return;
                            }
                            var fileTemp: any = {
                                fileName: this.state.newFileName,
                                fileContent: ""
                            }
                            this.setState({
                                files: this.state.files.concat(fileTemp),
                                actualFile: this.state.newFileName,
                                newFileName: "",
                                show: !this.state.show
                            });
                        }}>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="text" placeholder="Name File" onChange={e => {
                                    this.setState({
                                        newFileName: e.target.value
                                    })
                                }
                                } />
                            </Form.Group>

                            <Container>
                                <Row>
                                    <Col><Button variant="primary" type="submit">Create File</Button></Col>
                                    <Col></Col>
                                    <Col><Button variant="danger" onClick={this.handleShow}>Cancel</Button></Col>
                                </Row>
                            </Container>

                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
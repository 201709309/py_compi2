import React, { Component } from 'react'
import { crearTextoGraphvizCST, crearTextoGraphvizRepGram } from "../Reportes/NodoCST";
import { FilePicker } from 'react-file-picker';
import { Nav, Navbar, Form, Button, Row, Col } from 'react-bootstrap';
import { Graphviz } from 'graphviz-react';
const parser = require('../Grammar/xmlGrammar')
const parserReport = require('../Reportes/xmlReport')

export default class Main extends Component {



    state = {
        consoleResult: "",
        xpath: "",
        xml: "",
        repcsttxt: '',
        repgramtxt: '',
        graphvizContent:''
    }

    parse = () => {

        const result = parser.parse(this.state.xml);
        const ast = result.ast;
        const listaErrores = result.listaErrores;
        console.log(ast)
        console.log(listaErrores)


        
        const xmlResRep = parserReport.parse(this.state.xml);
        this.setState({
            repgramtxt: "digraph G {" + crearTextoGraphvizRepGram(xmlResRep.ReporteGramatical[0], xmlResRep.ReporteGramatical[1], this.state.repcsttxt) + "}",
            repcsttxt: "digraph G {" + crearTextoGraphvizCST(xmlResRep.ReporteCST, this.state.repcsttxt) + "}"
        })
    }

    handleFileChange = file => {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (e: any) => {

            try {
                this.setState({
                    xml: e.target.result
                });
            } catch (e) {
                console.log(e);
            }
        };
    };

    onChangeReports = e => {
        console.log(this.state.graphvizContent)
        if (e.target.value==="Ocultar") {
            this.setState({
                graphvizContent : ''
            })
        }else if (e.target.value==="CST XML") {
            this.setState({
                graphvizContent : this.state.repcsttxt
            })
        }else if (e.target.value==="Reporte gramatical XML") {
            this.setState({
                graphvizContent : this.state.repgramtxt
            })
        }
    }

    render() {
        return (
            <>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/py_compi2">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <FilePicker maxSize={2} onChange={this.handleFileChange} onError={errMsg => console.log(errMsg)}>
                                <Button variant="link">Open File</Button>
                            </FilePicker>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className="mt-2 px-5">
                    <Row>
                        <Col xs={12} md={11}>
                            <Form.Control
                                type="text"
                                placeholder="Insert your commands here"
                                defaultValue={this.state.xpath}
                                onChange={(e: any) => {
                                    this.setState({
                                        xpath: e.target.value
                                    })
                                }} />
                        </Col>
                        <Col xs={6} md={1}>
                            <Button variant="primary" onClick={this.parse}>RUN</Button>
                        </Col>
                    </Row>
                    <br />
                    <Form.Control as="textarea" rows={15} defaultValue={this.state.xml} onChange={(e: any) => {
                        this.setState({
                            xml: e.target.value
                        })
                    }} />
                </div>

                <div className="mt-3 px-5">
                    <Form.Group>
                        <Form.Control as="select" name="tier" size="lg" onChange={this.onChangeReports}>
                            <option>Ocultar</option>
                            <option>Tabla de simbolos XML</option>
                            <option>Reporte de errores XML</option>
                            <option>CST XML</option>
                            <option>Reporte gramatical XML</option>
                        </Form.Control>
                    </Form.Group>
                </div>

                
                {
                    this.state.graphvizContent !== '' ? (
                        <div className="m-5  border border-primary">
                        <Graphviz className="m-1 d-flex justify-content-center" dot={this.state.graphvizContent} options={{ height: 750, width: 1485, zoom: true }}/>
                        </div>
                    ) : <div></div>
                }
               

                <div className="mt-3 px-5">
                    <Form.Control as="textarea" rows={6} defaultValue={this.state.consoleResult} />
                </div>
            </>
        )
    }
}
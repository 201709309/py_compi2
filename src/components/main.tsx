import React, { Component } from 'react'
import { crearTextoGraphvizCST, crearTextoGraphvizRepGram } from "../Reportes/NodoCST";
import { FilePicker } from 'react-file-picker';
import { Nav, Navbar, Form, Button, Row, Col } from 'react-bootstrap';
import { Graphviz } from 'graphviz-react';
import {crearTextoReporteErrorXML} from "../xmlAST/ClaseError";
import {crearTablaSimbolos,crearTextoGraphvizTablaSimbolos, SimboloTabla} from "../Reportes/SimboloTabla";
import { Entorno } from '../xmlAST/Entorno';
const parser = require('../Grammar/xmlGrammar')
const parserXmlDesc = require('../Grammar/xmlGrammarDesc')
const parserReport = require('../Reportes/xmlReport')

export default class Main extends Component {

    state = {
        consoleResult: "",
        xpath: "",
        xml: "",
        repcsttxt: '',
        repgramtxt: '',
        repErrorXML: '',
        repTablaSimbolos: '',
        graphvizContent: ''
    }

    parse = () => {

        let ast;
        let listaErrores;
        var TablaSimbolos = [];



        const result = parser.parse(this.state.xml)
        ast = result.ast;
        listaErrores = result.listaErrores;

        var entornoGlobal = new Entorno('Global','',0, 0,[],ast);

        console.log(ast)
        console.log(listaErrores)


        if (listaErrores.length === 0) {
            const xmlResRep = parserReport.parse(this.state.xml);
            this.setState({
                repgramtxt: "digraph G {" + crearTextoGraphvizRepGram(xmlResRep.ReporteGramatical[0], xmlResRep.ReporteGramatical[1], this.state.repcsttxt) + "}",
                repcsttxt: "digraph G {" + crearTextoGraphvizCST(xmlResRep.ReporteCST, this.state.repcsttxt) + "}",
                repTablaSimbolos: "digraph G {"+crearTextoGraphvizTablaSimbolos(crearTablaSimbolos(entornoGlobal,TablaSimbolos,"Global"),this.state.repTablaSimbolos)+"}"
            })
        } else {
            this.setState({
                repErrorXML: "digraph G {" + crearTextoReporteErrorXML(listaErrores,this.state.repErrorXML) + "}"
            })
        }

    }

    parseDesc = () => {
        const result = parserXmlDesc.parse(this.state.xml)
        let ast = result.ast;

        console.log(ast)
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
        //console.log(this.state.graphvizContent)
        if (e.target.value === "Ocultar") {
            this.setState({
                graphvizContent: ''
            })
        } else if (e.target.value === "CST XML") {
            this.setState({
                graphvizContent: this.state.repcsttxt
            })
        } else if (e.target.value === "Reporte gramatical XML") {
            this.setState({
                graphvizContent: this.state.repgramtxt
            })
        }else if (e.target.value === "Reporte de errores XML") {
            this.setState({
                graphvizContent: this.state.repErrorXML
            })
        } else if (e.target.value === "Tabla de simbolos XML") {
            this.setState({
                graphvizContent: this.state.repTablaSimbolos
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
                        <Col xs={12} md={8}>
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
                        <Col xs={6} md={2}>
                            <Button variant="primary" onClick={this.parse}>RUN ASC</Button>
                        </Col>
                        <Col xs={6} md={2}>
                            <Button variant="primary" onClick={this.parseDesc}>RUN DESC</Button>
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
                            <Graphviz className="m-1 d-flex justify-content-center" dot={this.state.graphvizContent} options={{ height: 750, width: 1485, zoom: true }} />
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
import React, { Component } from 'react'
import { FilePicker } from 'react-file-picker';
import { Nav, Navbar, Form, Button, Row, Col } from 'react-bootstrap';
import { Objeto } from '../xmlAST/Objeto';
import { Simbolo } from '../xmlAST/Simbolo';
import { Tipo } from '../xmlAST/Tipo';
import { Entorno } from '../xmlAST/Entorno';
const parser = require('../Grammar/xmlGrammar')

export default class Main extends Component {

    state = {
        consoleResult: "",
        xpath: "",
        xml: ""
    }

    parse = () => {

        const ast = parser.parse(this.state.xml);
        const entornoGlobal : Entorno = new Entorno(null)
        /*this.setState({
            consoleResult: ast
        })*/
        console.log(ast)
        //this.crearTablaSimbolos(ast, entornoGlobal)

        //console.log(entornoGlobal)

    }

    crearTablaSimbolos = (objeto, entorno : Entorno) => {


        const simbolo : Simbolo =  new Simbolo(Tipo.OBJETO,objeto.identificador,objeto.linea,objeto.columna)
        entorno.agregar(objeto.identificador,simbolo)
        const entornoObjeto : Entorno = new Entorno(entorno)

        objeto.forEach(element => {
            if (element.listaObjetos.length>0) {
                element.listaObjetos.forEach(element => {
                    const simbolo : Simbolo =  new Simbolo(Tipo.OBJETO,element.identificador,element.linea,element.columna)
                    entornoObjeto.agregar(element.identificador,simbolo)
                    this.crearTablaSimbolos(element,entornoObjeto)
                });
            }
            if (element.listaAtributos.length>0) {
                
            }
        });
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
                    <Form.Control as="textarea" rows={6} defaultValue={this.state.consoleResult} />
                </div>
            </>
        )
    }
}
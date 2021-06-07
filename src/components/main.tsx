import React, { Component } from 'react'
import { FilePicker } from 'react-file-picker';
import { Nav, Navbar, Form, Button, Row, Col } from 'react-bootstrap';
//import { Graphviz } from 'graphviz-react';
const parser = require('../Grammar/xmlGrammar')

export default class Main extends Component {

    state = {
        consoleResult: "",
        xpath: "",
        xml: ""
    }

    parse = () => {
        const result = parser.parse(this.state.xml);
        const ast = result.ast;
        const textgram = result.reporteGramatica;
        /*this.setState({
            consoleResult: ast
        })*/
        console.log(ast)
        console.log(textgram)
        //this.crearTablaSimbolos(ast, entornoGlobal)

        //console.log(entornoGlobal)

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

    /*<Graphviz dot={`graph {
  grandparent -- "parent A";
  child;
  "parent B" -- child;
  grandparent --  "parent B";
}`} />*/

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
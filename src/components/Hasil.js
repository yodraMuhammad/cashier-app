import React, { Component } from 'react'
import {Col, Row, ListGroup, Badge} from 'react-bootstrap'
import TotalBayar from './TotalBayar'
import ModalKeranjang from './ModalKeranjang' 

export default class Hasil extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showModal: false,
       keranjangDetail: null,
       jumlah: 0,
       keterangan: '',
    }
  }

  handleShow = (menuKeranjang) =>{
    this.setState({
        showModal: true,
        keranjangDetail: menuKeranjang,
        jumlah: menuKeranjang.jumlah,
        keterangan: menuKeranjang.keterangan
      })
    }
    
    handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah+1
    })
  }

  kurang = () => {
    if(this.state.jumlah>1){
      this.setState({
        jumlah: this.state.jumlah-1
      })
    }
  }

  changeHandler = (event) => {
    console.log(event.target.value)
    this.setState({
      keterangan: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("Sukses", this.state.keterangan)
  }

  render() {
    const {keranjangs} = this.props;
    return (
        <Col md={3} mt="2">
            <h4><strong>Hasil</strong></h4>
            <hr/>
            {keranjangs && (
              <ListGroup variant="flush">
                { keranjangs.map((menuKeranjang)=>(
                  <ListGroup.Item 
                  key={menuKeranjang.id} 
                  onClick={() => this.handleShow(menuKeranjang)}
                  >
                    <Row>
                      <Col xs={2}>
                        <h4>
                          <Badge pill variant='success'>
                             {menuKeranjang.jumlah}
                          </Badge>
                        </h4>
                      </Col>
                      <Col>
                        <h5>{menuKeranjang.product.nama}</h5>
                        <p>Rp. {menuKeranjang.product.harga.toLocaleString()}</p>
                      </Col>
                      <Col>
                        <strong className='float-right'>
                          <p>Rp. {menuKeranjang.total_harga.toLocaleString()}</p>
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
                <ModalKeranjang {...this.state} handleClose={this.handleClose} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.changeHandler}/>
              </ListGroup>
            )}
            <TotalBayar keranjangs={keranjangs}/>
        </Col>
    )
  }
}

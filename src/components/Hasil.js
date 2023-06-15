import React, { Component } from 'react'
import {Col, Row, ListGroup, Badge, Card} from 'react-bootstrap'
import TotalBayar from './TotalBayar'
import ModalKeranjang from './ModalKeranjang' 
import axios from 'axios'
import swal from 'sweetalert'
import { API_URL } from '../utils/constants'

export default class Hasil extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showModal: false,
       keranjangDetail: null,
       jumlah: 0,
       keterangan: '',
       totalHarga: 0,
    }
  }

  handleShow = (menuKeranjang) =>{
    this.setState({
        showModal: true,
        keranjangDetail: menuKeranjang,
        jumlah: menuKeranjang.jumlah,
        keterangan: menuKeranjang.keterangan,
        totalHarga: menuKeranjang.total_harga
      })
    }
    
    handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  tambah = () => {
    this.setState({
      jumlah: this.state.jumlah+1,
      totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah+1)
    })
  }

  kurang = () => {
    if(this.state.jumlah>1){
      this.setState({
        jumlah: this.state.jumlah-1,
        totalHarga: this.state.keranjangDetail.product.harga*(this.state.jumlah-1)
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
    this.handleClose();
    const data = {
      jumlah: this.state.jumlah,
      total_harga: this.state.totalHarga,
      product: this.state.keranjangDetail.product,
      keterangan:this.state.keterangan
    }
    axios
      .put(API_URL+`keranjangs/`+this.state.keranjangDetail.id,data)
      .then(res => {
        this.props.getListKeranjang();
        swal({
          title: 'Update Pesanan',
          text: 'Sukses Update Pesanan'+data.product.nama,
          icon: 'success',
          buttons: false,
          timer: 1000,
        })
      })
      .catch(err => console.log(err))
  }

  hapusPesanan = (id) => {
    this.handleClose();
    axios
      .delete(API_URL+`keranjangs/`+id)
      .then(res => {
        this.props.getListKeranjang();
        swal({
          title: 'Hapus Pesanan',
          text: 'Sukses Hapus Pesanan'+this.state.keranjangDetail.product.nama,
          icon: 'error',
          buttons: false,
          timer: 1000,
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const {keranjangs} = this.props;
    return (
        <Col md={3} className='mt-3'>
            <h4><strong>Hasil</strong></h4>
            <hr/>
            {keranjangs && (
              <Card className='overflow-auto hasil'>
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
                  <ModalKeranjang {...this.state} handleClose={this.handleClose} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit} hapusPesanan={this.hapusPesanan}/>
                </ListGroup>
              </Card>
            )}
            <TotalBayar keranjangs={keranjangs}/>
        </Col>
    )
  }
}

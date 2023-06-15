import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import {API_URL} from '../utils/constants'
import {Link} from 'react-router-dom'

export default class TotalBayar extends Component {
  submitTotalBayar = (totalBayar) =>{
    const pesanan = {
      total_bayar: totalBayar,
      menus: this.props.keranjangs
    }

    axios
      .post(API_URL+"pesanans", pesanan)
      .then((res)=>{})
  }

  render() {
    const totalBayar = this.props.keranjangs.reduce((result, item) => result + item.total_harga,0) 
    return (
      <>
      {/* webb */}
      <div className='fixed-bottom d-none d-md-block'>
        <Row>
          <Col md={{span: 3,offset: 9 }} className='px-4'>
            <h4>Total Harga : <strong className='float-end mr-2'>Rp. {totalBayar.toLocaleString()}</strong></h4>
            <Button variant='primary' className='mb-3 w-100' size='lg' onClick={()=>{this.submitTotalBayar()}} as={Link} to='/sukses'>
              <FontAwesomeIcon icon={faShoppingCart} className='me-2'/>
              <strong>Bayar</strong>
            </Button>
          </Col>
        </Row>
      </div>

      {/* Mobile */}
      <div className='d-sm-block d-md-none mt-3 mb-2'>
        <Row>
          <Col md={{span: 3,offset: 9 }} className='px-4'>
            <h4>Total Harga : <strong className='float-end mr-2'>Rp. {totalBayar.toLocaleString()}</strong></h4>
            <Button variant='primary' className='mb-3 w-100' size='lg' onClick={()=>{this.submitTotalBayar()}} as={Link} to='/sukses'>
              <FontAwesomeIcon icon={faShoppingCart} className='me-2'/>
              <strong>Bayar</strong>
            </Button>
          </Col>
        </Row>
      </div>
      </>
    )
  }
}

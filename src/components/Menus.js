import React from 'react'
import { Col, Card } from 'react-bootstrap'

export const Menus = ({menu, masukKeranjang}) => {
  return (
    <Col md={4} xs={6} className='mb-3' onClick={()=> masukKeranjang(menu)}>
        <Card className='shadow'>
            <Card.Img variant="top" src={"assets/images/"+menu.category.nama+'/'+menu.gambar} />
            <Card.Body>
                <Card.Title>{menu.nama} <strong>({menu.kode})</strong></Card.Title>
                <Card.Text>Rp. {menu.harga.toLocaleString()}</Card.Text>
            </Card.Body>
        </Card>
    </Col>
  )
}

import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Modal, Button, Form, FormGroup } from 'react-bootstrap'

export default function ModalKeranjang({showModal, handleClose, keranjangDetail, jumlah, keterangan, totalHarga, tambah, kurang, changeHandler, handleSubmit, hapusPesanan}) {
  if(keranjangDetail){
    return (
      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {keranjangDetail.product.nama} {"  "}
              <strong>Rp. {keranjangDetail.product.harga.toLocaleString()}</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Total Harga :</Form.Label>
                <p><strong>Rp. {totalHarga.toLocaleString()}</strong></p>
              </Form.Group>
              <Form.Group>
                <Form.Label>Jumlah :</Form.Label>
                <br/>
                <Button variant='primary' size='sm' className='me-2' onClick={()=>{tambah()}}>
                  <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <strong>{jumlah}</strong>
                <Button variant='primary' size='sm' className='ms-2' onClick={()=>{kurang()}}>
                  <FontAwesomeIcon icon={faMinus}/>
                </Button>
                <FormGroup>
                  <Form.Label>Ketrangan :</Form.Label>
                  <Form.Control as="textarea" rows='3' name='keterangan' placeholder='Contoh : Pedas, Nasi Setengah' value={keterangan} onChange={changeHandler}/>
                </FormGroup>
              </Form.Group>
              <Button variant='primary' type='submit' className='mt-2' >
                Simpan
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={()=>hapusPesanan(keranjangDetail.id)}>
                <FontAwesomeIcon icon={faTrash} className='me-2'/>
                Hapus Pesanan
            </Button>
          </Modal.Footer>
      </Modal>
    )
  }
}

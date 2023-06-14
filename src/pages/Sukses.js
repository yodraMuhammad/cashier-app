import React, { Component } from 'react'
import { Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../utils/constants'

export default class Sukses extends Component {
  componentDidMount(){
    axios
      .get(API_URL+`keranjangs`)
      .then(res => {
        const keranjangs = res.data;
        keranjangs.map((item)=>{
          axios
            .delete(API_URL+"keranjangs/"+item.id)
            .then((res)=> console.log(res))
            .catch((err)=> console.log(err))
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
        <div className='mt-4 text-center'>
            <Image src='assets/images/sukses.png' width={500} />
            <h2>Sukses Pesan</h2>
            <p>Terimakasih sudah memesan</p>
            <Button variant="primary" as={Link} to='/'>Kembali</Button>
        </div>
    )
  }
}

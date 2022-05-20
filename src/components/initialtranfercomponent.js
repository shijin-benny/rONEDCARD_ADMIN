import React, { useState } from 'react';
// import { MDBDataTableV5 } from 'mdbreact';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import axios from 'axios';
// import { Button } from '@material-tailwind/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

function Intialtranfercomponent() {
  const initialstate = {
    roneId: '',
    cards: null,
    toRoneId: '',
    balance: '',
    fromName: '',
    toName: '',
    toerror: '',
    fromerror:'',
    status: false
  }
  const [data, setData] = useState(initialstate);
  const handleInputs = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    if (data.roneId !== '' && data.toRoneId !== '' && data.cards !== '') {
      if (data.balance >= data.cards) {
        axios.post('https://rone-card.herokuapp.com/api/initialtranfer', data).then((res) => {
          alert('Transfer Successfully');
          setData(initialstate);
        }).catch((err) => {
          alert('Transfer Failed');
        })
      } else {
        alert('balance is not enough');
      }
    } else {
      alert('please fill all the field');
    }
  }
  const handle = (e) => {
    if (e.target.name === 'roneId') {
      axios.get(`https://rone-card.herokuapp.com/api/initialtransferdetails/?roneId=${data.roneId}&role=${e.target.name}`).then((res) => {
        if (res.data.balance > 0) {
          setData({ ...data, balance: res.data.balance, fromName: res.data.name, status: true ,fromerror:''});
        } else if (res.data.error) {
        setData({ ...data, fromerror: res.data.error, status: false });
        } else if (res.data.message) {
          setData({ ...data, fromerror: res.data.message, status: false });
        }
      })
    } else if (e.target.name === 'toRoneId') {
      axios.get(`https://ronedtest.herokuapp.com/rone_id_authentication?rone_id=${data.toRoneId}`).then((res) => {
        if(res.data.Old_users === null && res.data.New_user === null){
          setData({ ...data, toerror: 'Invalid RoneId', status: false });
          setTimeout(() => {
            setData({ ...data, toerror: '' });
          }, 2000);
        }   
      })
    }

  }
  console.log(data);
  return (
    <Card>
      <CardHeader color="purple" contentPosition="left">
        <h2 className="text-white text-2xl">Initial Transfer</h2>
      </CardHeader>
      <CardBody>
        <div className='flex flex-row justify-between max-w-full'>
          <div className='w-2/5'>
            <h1 className='font-bold text-lg mb-4'>From</h1>
            <div class="mb-6">
              <label  class="block mb-2 text-md font-bold text-gray-900 dark:text-gray-300">RoneId</label>
              <input onChange={handleInputs} onBlur={handle} value={data.roneId} type="text" id="roneId" name='roneId' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="RONE12345" required />
              {data.fromerror ? <p className='text-red-500 text-sm font-bold'>{data.fromerror}</p> : ''}
            </div>
            {data.balance ? <> <div class="mb-6">
              <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Initial card balance</label>
              <p className='text-gray-900 text-lg font-bold'>{data.balance}</p>
            </div>
              <div class="mb-6">
                <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                <p className='text-gray-900 text-lg font-bold'>{data.fromName}</p>
              </div>  </> : ''}
            <div class="mb-6">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cards to transfer</label>
              <input onChange={handleInputs} value={data.cards} type="number" min={0} max={data.balance} id="card" name='cards' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
            </div>
            {data.status ? <button onClick={handleSubmit} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Transfer</button> : ""}
          </div>
          <div className='w-2/5'>
            <h1 className='font-bold text-lg mb-4'>TO</h1>
            <div class="mb-6">
              <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">RoneId</label>
              <input onChange={handleInputs} onBlur={handle}  value={data.toRoneId} type="text" id="toRoneId" name='toRoneId' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="RONE12345" required />
              {data.toerror ? <p className='text-red-500 text-sm font-bold'>{data.toerror}</p> : ''}
            </div>
            {data.toName ? <>  <div class="mb-6">
                <label  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Username</label>
                <p className='text-gray-900 text-lg font-bold'>{data.toName}</p>
              </div></> : ''}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default Intialtranfercomponent
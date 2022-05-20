import React, { useState, useEffect } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import axios from 'axios';
import { Button } from '@material-tailwind/react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';



export default function Basic() {
  // const [balance, setBalance] = useState();
  // const [viewbtn, setViewbtn] = useState(false);
  const open = (Id) => {
    alert(Id)
  }
  const view = (Id) => {
    axios.get(`https://rone-card.herokuapp.com/api/viewbalance/${Id}`).then((res) => {
      // setBalance(res.data.balance)
    })
  }
  useEffect(() => {
    axios.get("https://rone-card.herokuapp.com/api/wallet").then(async (res) => {
      console.log(res.data);
      await setwallet(res.data.wallet);
    })
  }, [])
  const [wallet, setwallet] = useState([]);
  const userAttribute = []
  wallet.forEach(element => {
    userAttribute.push({
      name: element.name,
      roneId: element.roneId,
      view: <Button onClick={() => view(element.roneId)}>view</Button>,
      action: <Button onClick={() => open(element.roneId)} color='purple' >Generate</Button>

    })
  });
  console.log(userAttribute);
  const data = {
    columns: [
      {
        label: 'Name',
        field: 'name',
        width: 100,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'roneId',
        field: 'roneId',
        width: 100,
      },
      {
        label: "Card balance",
        field: "view",
        width: 100,
      },
      {
        label: 'Action',
        field: 'action',
        width: 90
      }
    ],
    rows: userAttribute
  }
  return (
    <>
      <Card>
        <CardHeader color="purple" contentPosition="left">
          <h2 className="text-white text-2xl">rONE WALLET</h2>
        </CardHeader>
        <CardBody>
          <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            paginationLabel={["Previous", "Next"]}
            data={data}
            width="100%"
            pagingTop
            searchTop
            searchBottom={false}
          />          
        </CardBody>       
      </Card>
    </>

  )

}
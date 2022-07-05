 /* eslint-disable */
import React, { useState, useEffect} from 'react'
import Clients from './Clients'
import AddClient from './AddClient'
import { getClientsByUser } from '../../actions/clientActions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useHistory,Link } from 'react-router-dom'
import NoData from '../svgIcons/NoData'
import Spinner from '../Spinner/Spinner'
import { Button } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';

const ClientList = () => {

    const history = useHistory()
    const location = useLocation()
    const [open, setOpen] = useState(false)
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))
    const {clients} = useSelector((state) => state.clients)
    const isLoading = useSelector(state => state.clients.isLoading)
    // const clients = []

    
    // useEffect(() => {
    // }, [currentId, dispatch]);
    
//     useEffect(() => {
//         dispatch(getClients(1));
//         // dispatch(getClientsByUser({userId : user?.result?._id}));
//         // dispatch(getClientsByUser({ search :user?.result?._id, tags: tags.join(',') }));
//     },[location]
// )

useEffect(() => {
    dispatch(getClientsByUser({ search: user?.result?._id || user.result.googleId }));
  },[location, dispatch])

  if(!user) {
    history.push('/login')
  }

  const handleOpen =(e)=>{
    e.preventDefault();
    setOpen(true)
   }
  if(isLoading) {
    return  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px'}}>
        <Spinner />
    </div>
  }

  if(clients.length === 0) {
    return<>
    <Link to="#">
      <Button onClick={handleOpen} variant="contained" color='primary' style={{position:"absolute",marginTop:"25px",right: '25px'}} >
          <AddIcon/>Add Customer
      </Button>
    </Link>
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
      <NoData />
    <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>No customers yet. Click the plus icon to add customer</p>
  
    </div>
    </>
  }

    return (
        <div>
          <Link to="#">
            <Button onClick={handleOpen}  variant="contained" color='primary' style={{position:"absolute",marginTop:"25px",right: '25px'}} >
                <AddIcon/>Add Customer
            </Button>
          </Link>
            <AddClient 
                open={open} 
                setOpen={setOpen}
                currentId={currentId}
                setCurrentId={setCurrentId}
            />
            <Clients 
                open={open} 
                setOpen={setOpen}
                currentId={currentId}
                setCurrentId={setCurrentId}
                clients={clients}
            />
        </div>
    )
}

export default ClientList


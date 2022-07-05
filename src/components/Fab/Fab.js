import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import AddClient from '../Invoice/AddClient';



const FabButton = () => {

  const location = useLocation()
  const mainButtonStyles = {backgroundColor: '#1976D2'}
  const [open, setOpen] = useState(false)


  // if(location.pathname === '/invoice') return null

    return (
        <div>
           <AddClient setOpen={setOpen} open={open} />
          <Fab
            mainButtonStyles={mainButtonStyles}
            icon={ <AddIcon />}
            alwaysShowTitle={true}
          >

            {location.pathname !== '/invoice' && (
              <Action
                  text="New Invoice"
                  // onClick={() =>  history.push(`/invoice`)}
                  onClick={() => window.location.href='/invoice'}
                >
                  <CreateIcon />
              </Action>
            )}
            {location.pathname !== '/order-form' && (
              <Action
                  text="Order Form"
                  // onClick={() =>  history.push(`/invoice`)}
                  onClick={() => window.location.href='/order-form'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </Action>
            )}
            {location.pathname !== '/package-list' && (
              <Action
                  text="Package List"
                  // onClick={() =>  history.push(`/invoice`)}
                  onClick={() => window.location.href='/package-list'}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-list __web-inspector-hide-shortcut__"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
      
              </Action>
            )}

            <Action
                text="New Customer"
                onClick={() => setOpen((prev) => !prev)}
              >
                <PersonAddIcon />
            </Action>

          </Fab>
        </div>
    )
}

export default FabButton

 /* eslint-disable */
 import React, { useState, useEffect} from 'react'
 import Products from './Products'
 import AddProduct from './AddProduct'
 import { getProductsByUser } from '../../actions/productActions'
 import { useDispatch, useSelector } from 'react-redux'
 import { useLocation, useHistory,Link } from 'react-router-dom'
 import NoData from '../svgIcons/NoData'
 import Spinner from '../Spinner/Spinner'
 import { Button } from '@material-ui/core'
 
 import AddIcon from '@material-ui/icons/Add';
 
 const ProductList = () => {
 
     const history = useHistory()
     const location = useLocation()
     const [open, setOpen] = useState(false)
     const [currentId, setCurrentId] = useState(null)
     const dispatch = useDispatch()
     const user = JSON.parse(localStorage.getItem('profile'))
     const {products} = useSelector((state) => state.productReducer)
     const isLoading = useSelector(state => state.productReducer.isLoading);
 
 useEffect(() => {
     dispatch(getProductsByUser({ search: user?.result?._id || user.result.googleId }));
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
 
   if(products.length === 0) {
     return<>
     <Link to="#">
       <Button onClick={handleOpen} variant="contained" color='primary' style={{position:"absolute",marginTop:"25px",right: '25px'}} >
           <AddIcon/>Add Product
       </Button>
     </Link>
     <AddProduct 
        open={open} 
        setOpen={setOpen}
        currentId={currentId}
        setCurrentId={setCurrentId}
    />
     <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', paddingTop: '20px', margin: '80px'}}>
       <NoData />
     <p style={{padding: '40px', color: 'gray', textAlign: 'center'}}>No products yet. Click the plus icon to add product</p>
   
     </div>
     </>
   }
 
     return (
         <div>
           <Link to="#">
             <Button onClick={handleOpen}  variant="contained" color='primary' style={{position:"absolute",marginTop:"25px",right: '25px'}} >
                 <AddIcon/>Add Product
             </Button>
           </Link>
             <AddProduct 
                 open={open} 
                 setOpen={setOpen}
                 currentId={currentId}
                 setCurrentId={setCurrentId}
             />
             <Products 
                 open={open} 
                 setOpen={setOpen}
                 currentId={currentId}
                 setCurrentId={setCurrentId}
                 products={products}
             />
         </div>
     )
 }
 
 export default ProductList;
 
 
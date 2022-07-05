 /* eslint-disable */
 import React, { useState, useEffect} from 'react';
 import { useLocation } from 'react-router-dom';
 import { withStyles } from '@material-ui/core/styles';
 import Button from '@material-ui/core/Button';
 import Dialog from '@material-ui/core/Dialog';
 import MuiDialogTitle from '@material-ui/core/DialogTitle';
 import MuiDialogContent from '@material-ui/core/DialogContent';
 import MuiDialogActions from '@material-ui/core/DialogActions';
 import IconButton from '@material-ui/core/IconButton';
 import CloseIcon from '@material-ui/icons/Close';
 import Typography from '@material-ui/core/Typography';
 
 import { useDispatch, useSelector } from 'react-redux'
 import { createProduct, updateProduct } from '../../actions/productActions'
 import { useSnackbar } from 'react-simple-snackbar'
 
 const styles = (theme) => ({
   root: {
     margin: 0,
     padding: theme.spacing(2),
     backgroundColor: '#1976D2',
     marginLeft: 0,
   },
   closeButton: {
     position: 'absolute',
     right: theme.spacing(1),
     top: theme.spacing(1),
     color: 'white',
   },
 });
 
 const DialogTitle = withStyles(styles)((props) => {
   const { children, classes, onClose, ...other } = props;
   return (
     <MuiDialogTitle disableTypography className={classes.root} {...other}>
       <Typography variant="h6">{children}</Typography>
       {onClose ? (
         <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
           <CloseIcon />
         </IconButton>
       ) : null}
     </MuiDialogTitle>
   );
 });
 
 const DialogContent = withStyles((theme) => ({
   root: {
     padding: theme.spacing(3),
   },
 }))(MuiDialogContent);
 // item type array
 const typeOfItems = ['Capsule','Injection/Ampoule','Syrup','Drops','Tablet',]
 
 const DialogActions = withStyles((theme) => ({
   root: {
     margin: 0,
     padding: theme.spacing(1),
   },
 }))(MuiDialogActions);
 
 const AddProduct = ({ setOpen, open, currentId, setCurrentId }) => {
     const location = useLocation()
     const [productData, setProductData] = useState({ 
       itemName: '', itemPack: '', itemPower: '', itemType: '', tradePrice: '',retailPrice:""})
     const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
     const dispatch = useDispatch()
     const product = useSelector((state)=> currentId ? state.products.products.find((c) => c._id === currentId) : null)
     // eslint-disable-next-line 
     const [openSnackbar, closeSnackbar] = useSnackbar()
 
 
     useEffect(() => {
       if(product) {
         setProductData(product)
       }
     }, [product])
 
     useEffect(() => {
       setUser(JSON.parse(localStorage.getItem('profile')))
       // setProductData({...productData, userId: user?.result?._id})
     },[location])
 
 
     useEffect(() => {
       var checkId = user?.result?._id
       if(checkId !== undefined) {
         setProductData({...productData, userId: [checkId]})
       } else {
         setProductData({...productData, userId: [user?.result?.googleId]})
       }
       
     },[location])
 
 
     const handleSubmitProduct =(e)=> {
         e.preventDefault()
         if(currentId) {
           dispatch(updateProduct(currentId, productData, openSnackbar))
         } else {
           dispatch(createProduct(productData, openSnackbar))
         }
         
         clear()
         handleClose()
     }
 
   const clear =() => {
     setCurrentId(null) 
     setProductData({  itemName: '', itemPack: '', itemPower: '', itemType: '', tradePrice: '',retailPrice:"" })
   }
     
   const handleClose = () => {
     setOpen(false);
   };
 
   const inputStyle = {
     display: "block",
     padding: "1.4rem 0.75rem",
     width: "100%",
     fontSize: "0.8rem",
     lineHeight: 1.25,
     color: "#55595c",
     backgroundColor: "#fff",
     backgroundImage: "none",
     backgroundClip: "padding-box",
     borderTop: "0",
     borderRight: "0",
     borderBottom: "1px solid #eee",
     borderLeft: "0",
     borderRadius: "3px",
     transition: "all 0.25s cubic-bezier(0.4, 0, 1, 1)"
 }
 
 
   return (
     <div>
         <form >
       <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth>
             <DialogTitle id="customized-dialog-title" onClose={handleClose} style={{paddingLeft: '20px', color: 'white'}}>
             {currentId? 'Edit Product' : 'Add new Product'}
             </DialogTitle>
             <DialogContent dividers>
 
 
             <div className="customInputs">
               <input 
                 placeholder="Item Name" 
                 style={inputStyle} 
                 name='itemName' 
                 type='text'  
                 onChange={(e) => setProductData({...productData, itemName: e.target.value})}
                 value={productData.itemName} 
               />
 
               <input 
                 placeholder="Item Pack" 
                 style={inputStyle} 
                 name='itemPack' 
                 type='text' 
                 onChange={(e) => setProductData({...productData, itemPack: e.target.value})}
                 value={productData.itemPack} 
               />
 
               <input 
                 placeholder="Item Power" 
                 style={inputStyle} 
                 name='itemPower' 
                 type='text'  
                 onChange={(e) => setProductData({...productData, itemPower: e.target.value})}
                 value={productData.itemPower} 
               />
                <select
                    placeholder="Item Type" 
                    style={inputStyle} 
                    name='itemType' 
                    type='text'
                    onChange={(e) => setProductData({...productData, itemType: e.target.value})}
                    value={productData.itemType}
                >
                    <option></option>
                    {
                        typeOfItems.map((item,index)=>(
                            <option key={index}>{item}</option>
                        ))
                    }
                </select>
               {/* <input 
                 placeholder="Item Type" 
                 style={inputStyle} 
                 name='itemType' 
                 type='text' 
                 onChange={(e) => setProductData({...productData, itemType: e.target.value})}
                 value={productData.itemType} 
               /> */}
                <input 
                 placeholder="Trade Price" 
                 style={inputStyle} 
                 name='tradePrice' 
                 type='text' 
                 onChange={(e) => setProductData({...productData, tradePrice: e.target.value})}
                 value={productData.tradePrice} 
               />
                <input 
                 placeholder="Retail Price" 
                 style={inputStyle} 
                 name='retailPrice' 
                 type='text' 
                 onChange={(e) => setProductData({...productData, retailPrice: e.target.value})}
                 value={productData.retailPrice} 
               />
           </div>
 
             </DialogContent>
             <DialogActions>
             <Button  onClick={handleSubmitProduct}  variant="contained" style={{marginRight: '25px'}} >
                 Save Product
             </Button>
             </DialogActions>
       </Dialog>
         </form>
     </div>
   );
 }
 
 export default AddProduct;
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    products as localProducts,
    newArrivalsList,
    mustTryList,
    lipstickList,
    liquidLipstickList,
    nailPaintList,
    lipLinearList,
    shampooList,
    soapList,
    brushToolsList,
    oilList,
    faceWashList,
    roomSprayList,
    necklaceList,
    accessoriesList,
    hairLookList
} from "../assets/assets";

export const ShopContext = createContext({ products: [] });

const ShopContextProvider = (props) => {
    console.log("ShopContextProvider rendering");
    

    const currency = 'Rs';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch] = useState('');
    const[showSearch, setShowSearch] = useState(true)
    const [cartItems,setCartItems] = useState({});
    const [wishlistItems, setWishlistItems] = useState([]);
    const [products,setProducts] = useState(localProducts || []);
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId,size) => {

        if(!size) {
            toast.error('Please select a size');
            return;
        }
        let cartData = structuredClone(cartItems);
        
        if(cartData[itemId]) {
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }else {
                cartData[itemId][size] = 1;
            }
        }else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if(token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])

    useEffect(() => {
        const storedWishlist = localStorage.getItem('wishlistItems');
        if (storedWishlist) {
            try {
                const parsed = JSON.parse(storedWishlist);
                if (Array.isArray(parsed)) {
                    setWishlistItems(parsed);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const toggleWishlist = (itemId) => {
        setWishlistItems((prev) => {
            if (prev.includes(itemId)) {
                return prev.filter((id) => id !== itemId);
            }
            return [...prev, itemId];
        });
    };

    const getWishlistCount = () => wishlistItems.length;

    const isInWishlist = (itemId) => wishlistItems.includes(itemId);

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if(token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})
            } catch(error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartAmount =  () => {
        let totalAmount = 0;
        const extraProducts = [
            ...newArrivalsList,
            ...mustTryList,
            ...lipstickList,
            ...liquidLipstickList,
            ...nailPaintList,
            ...lipLinearList,
            ...shampooList,
            ...soapList,
            ...brushToolsList,
            ...oilList,
            ...faceWashList,
            ...roomSprayList,
            ...necklaceList,
            ...accessoriesList,
            ...hairLookList,
        ];
        for(const items in cartItems) {
            let itemInfo = products.find((product)=> product._id === items)
                || extraProducts.find((product)=> product._id === items);
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0 && itemInfo?.price) {
                        totalAmount += cartItems[items][item] * itemInfo.price;
                    }
                } catch (error) {
                    
                }
                
            }
        }
        return totalAmount;
    }

    const getProductData = async () => {
        try {
            const response =  await axios.get(backendUrl + '/api/product/list');
            if(response.data.success){
                // Merge database products with local assets products (avoiding duplicates by ID)
                setProducts(prevProducts => {
                    const localIds = prevProducts.map(p => p._id.toString());
                    const dbProducts = response.data.products.filter(p => !localIds.includes(p._id.toString()));
                    return [...prevProducts, ...dbProducts];
                });
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get',{},{headers:{token}})
            if(response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch(error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        // Ensure localProducts are injected during HMR
        setProducts(prevProducts => {
            const existingIds = new Set(prevProducts.map(p => p._id.toString()));
            const missingLocals = localProducts.filter(p => !existingIds.has(p._id.toString()));
            return [...missingLocals, ...prevProducts];
        });
        getProductData();
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'));
            getUserCart(localStorage.getItem('token'))
        }
    },[])

    const value = {
        products, currency, delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems, addToCart, setCartItems, getCartCount, updateQuantity, getCartAmount,
        wishlistItems, toggleWishlist, getWishlistCount, isInWishlist,
        navigate, backendUrl, token, setToken
    }
    return (
        <ShopContext.Provider value={value}>
                {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider

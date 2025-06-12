import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { fireStore } from "../../utils/Firebase";

// 1. Create the context
const Context = createContext(null);

// 2. Export the custom hook to use the context
export const useItemContext = () => useContext(Context);

// 3. Create the provider
const ItemContextProvider = ({ children }) => {
    const [items, setItems] = useState(null);

    useEffect(() => {
        const fetchItemsFromFirestore = async () => {
            try {
                const productsCollection = collection(fireStore, 'products');
                const productSnapshot = await getDocs(productsCollection); // ✅ use getDocs instead of getDoc
                const productsList = productSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setItems(productsList);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchItemsFromFirestore();
    }, []);

    return (
        <Context.Provider value={{ items, setItems }}>
            {children} 
        </Context.Provider>
    );
};

export default ItemContextProvider;

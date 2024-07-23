// action creator
import { fetchProducts } from "../slice/productsSlice";

export function getProducts (){
    return async function getProducts(dispatch) {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            dispatch(fetchProducts(data));
        } catch (error) {
            console.error('Failed to fetch products:', error);
            console.log(process.env.REACT_APP_API_URL);

            // Handle the error as needed (e.g., dispatch an error action)
        }
    };
}
import axios from "axios";

export const GET_USER_DETAIL = "GET_USER_DETAIL";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_ORDER_ID = "GET_ORDER_ID";
export const GET_ALL_ORDERS = "GET_ALL_ORDERS";
export const ORDER_DECLARED_VALUE = "ORDER_DECLARED_VALUE"

const URL_BASE = "http://localhost:3000"

const getAllUsers = ()=>{
    return async (dispatch)=>{
        try {
        const {data} = await axios.get(`${URL_BASE}/users`)
        // console.log(data)
        return dispatch({
            type: GET_ALL_USERS,
            payload: data
        })
        } catch (error) {
         window.alert (error.message)
        }      
    }
}

const getUserDetail = (id)=>{
    return async (dispatch)=>{
        try {
        const {data} = await axios.get(`http://localhost:3000/users/${id}`)       
    //    const data=users.find(usuario => usuario.id === 4)
        console.log (data)
        return dispatch({
            type: GET_USER_DETAIL,
            payload: data
        })
        } catch (error) {
         window.alert (error.message)
        }      
    }
}


const getAllOrders = () =>{
    return async (dispatch) => {    
        try {
            const {data} = await axios.get("http://localhost:3000/order_shipments");
            console.log(data)
            return dispatch ({ 
                type: GET_ALL_ORDERS, 
                payload: data
            })
        } catch (error) {
            window.alert (error.message)   
        }
    }
 } 

const getOrderById = (id)=>{
    return async (dispatch)=>{
        try {
            const {data} = await axios.get(`http://localhost:3000/order_shipments/${id}`)
            // const data=orders.find(order => order.id === id)
            return dispatch ({
                type: GET_ORDER_ID,
                payload: data
                })
        } catch (error) {
            window.alert ('No existe una orden de pedido con ese número')           
        }
    }
}

// const orderWeight = (order) =>{
//     return async (dispatch)=>{
//         try{
//             const {data} = await axios.get(`http://localhost:3000/order_shipments/?${order}`)
//             return dispatch ({
//                 type: ORDER_WEIGHT,
//                 payload: data
//             })
//         }catch (error) {
//             window.alert ('No existe una orden de pedido con ese número')           
//         }
//     }
// }

const orderDeclaredValue = (selectedValues) => {
    return async (dispatch) => {
        try {
            // Construir la cadena de parámetros de consulta con claves asociadas a los valores seleccionados
            const queryParams = selectedValues.map(field => `${Object.keys(field)[0]}=${Object.values(field)[0]}`).join('&');
            // Agregar la cadena de parámetros de consulta a la URL base
            const url = `http://localhost:3000/order_shipments?${queryParams}`;
            
            // Realizar la solicitud GET con la URL construida
            const { data } = await axios.get(url);
            console.log("Carlosssss", data);
            // Despachar la acción con los datos obtenidos
            return dispatch({
                type: ORDER_DECLARED_VALUE,
                payload: data
            });
        } catch (error) {
            window.alert(error.message);
        }
    };
};
export {
    getUserDetail,
    getAllUsers, 
    getOrderById,
    getAllOrders,
    orderDeclaredValue}

    // const getUserDetail = (id) => {
//     return async (dispatch) => {
//       try {
//         const { data } = await axios.get('../../data/data.json');
//         console.log(data)
//         const user = data.users.find(user => user.id === id);
  
//         if (!user) {
//           throw new Error('User not found');
//         }
  
//         return dispatch({
//           type: GET_USER_DETAIL,
//           payload: user
//         });
//       } catch (error) {
//         window.alert(error.message);
//       }
//     };
//   };

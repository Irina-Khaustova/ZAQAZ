import {ReactComponent as MyIconRed} from "../image/Status-red.svg"
import {ReactComponent as MyIconBlue} from "../image/Status-blue.svg"
import {ReactComponent as MyIconOrange} from "../image/Status-orange.svg"
import {ReactComponent as MyIconGreen} from "../image/Status-green.svg"

export default function changeStatusOrder(status) {

    if (status === "WAITING") {
        return <MyIconOrange/>
    } else if (status === "IN_TRANSIT") {
        return <MyIconGreen/> 
    } else if (status === "READY_FOR_DELIVERY") {
        return <MyIconBlue/> 
    } else if (status === "IN_STOCK") {
        return <MyIconRed/> 
    }
    
    return changeStatusOrder;
  }
  

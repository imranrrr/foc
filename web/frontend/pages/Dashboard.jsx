import React from "react"
import LowInventory from "../components/dashboard/LowInventory/LowInventory";
import OutOfStock from "../components/dashboard/OutOfStock/OutOfStock";
import SoldProducts from "../components/dashboard/SoldProducts/SoldProducts";
import  Messages  from "../components/dashboard/Messages/Messages"
export default function Dashboard(){

    return(
        <div style={{display: 'flex', flexWrap: "wrap"}}>
            <LowInventory width="590px" />
            <OutOfStock  width="590px"/>
            <SoldProducts  width="590px"/>
            <Messages  width="590px"/>
        </div>
    )
}
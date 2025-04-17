import React from 'react';
import {Outlet} from "react-router";

function OnlyDispatchers() {
    return (
        <Outlet/>
    );
}

export default OnlyDispatchers;
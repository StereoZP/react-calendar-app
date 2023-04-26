import React from 'react';
import {useContext} from "react";
import {DateContext} from "../Context/dateContext";

const EventTimeRange = () => {
    const dateContext = useContext(DateContext)
    return (
        <div>
            {
                dateContext.state.event.startTime ?
                    <div>
                        <div>
                            <div>From:{dateContext.state.event.startTime}</div>
                        </div>
                        <div>
                            <div>To:{dateContext.state.event.endTime}</div>
                        </div>
                    </div> :
                    ""
            }
        </div>
    );
};

export default EventTimeRange;
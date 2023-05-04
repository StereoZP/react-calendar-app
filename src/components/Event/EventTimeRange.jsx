import React from 'react';
import {useContext} from "react";
import {DateContext} from "../Context/dateContext";

const EventTimeRange = () => {
    const dateContext = useContext(DateContext)
    return (
        <div>
            {
                dateContext.state.events.startTime ?
                    <div>
                        <div>
                            <div>From:{dateContext.state.events.startTime}</div>
                        </div>
                        <div>
                            <div>To:{dateContext.state.events.endTime}</div>
                        </div>
                    </div> :
                    ""
            }
        </div>
    );
};

export default EventTimeRange;
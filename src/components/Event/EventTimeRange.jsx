import React from 'react';
import {useContext} from "react";
import {EventListContext} from "../Context/eventListContext";

const EventTimeRange = () => {
    const eventList = useContext(EventListContext)
    return (
        <div>
            {
                eventList.endTime ?
                    <div>
                        <div>
                            <div>From:{eventList.startTime}</div>
                        </div>
                        <div>
                            <div>To:{eventList.endTime}</div>
                        </div>
                    </div> :
                    ""
            }
        </div>
    );
};

export default EventTimeRange;
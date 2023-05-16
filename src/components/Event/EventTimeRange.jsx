import React from 'react';
import {useContext} from "react";
import {ApplicationContext} from "../../сontext";

const EventTimeRange = (props) => {
    const {event} = props
    const {state} = useContext(ApplicationContext)
    return (
        <div>
            {
                event.startTime ?
                    <div>
                        <div>
                            <div>From:{event.startTime}</div>
                        </div>
                        <div>
                            <div>To:{event.endTime}</div>
                        </div>
                    </div> :
                    null
            }
        </div>
    );
};

export default EventTimeRange;
import React from 'react';

const EventTimeRange = (props) => {
    const {event} = props
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
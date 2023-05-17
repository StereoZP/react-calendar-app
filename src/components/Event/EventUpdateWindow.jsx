import React, {useContext} from 'react';
import classes from "../Calendar/Calendar.module.css";
import Input from "../UI/CustomInput/Input";
import Modal from "../UI/Modal/Modal";
import { ApplicationContext} from "../../сontext";
import cl from "../Form/Form.module.css";
import SelectedTime from "../Form/SelectedTime";
import ListOfUsers from "../Users/ListOfUsers";

const EventUpdateWindow = (props) => {
    const {state, dispatch} = useContext(ApplicationContext)
    const {isOpenUpdate, setIsOpenUpdate, openConfirmModal} = props

    return (
        <div>
            <Modal className={classes.modalContainer} visible={isOpenUpdate}
                   setVisible={setIsOpenUpdate}>
                <div className={cl.inputBlock}>
                    <div>
                        <Input style={{width: "100%"}}
                               type="text"
                               value={state.updateTitle}
                               onChange={(e) => dispatch({type: "setUpdateTitle", payload: e.target.value})}
                               placeholder="Title"
                        />
                        <Input style={{width: "100%", marginTop: "10px"}}
                               type="text"
                               value={state.updateBody}
                               onChange={(e) => dispatch({type: "setUpdateBody", payload: e.target.value})}
                               placeholder="Body"
                        />
                    </div>
                    <div className={cl.formBlock}>
                        <div className={cl.inputCheckbox}>
                            <input type="checkbox" checked={state.isAllDayEvent} onChange={()=>dispatch({type: 'setAllDayEvent', payload: !state.isAllDayEvent})}/>
                        </div>
                        <div className={cl.inputCheckbox}>All day</div>
                    </div>
                </div>
                {
                    !state.isAllDayEvent ?
                        <SelectedTime/> :
                        ''
                }
                <div className={cl.formBlock}>
                    <button className={classes.buttonStyles} style={{marginTop: "10px"}}
                            onClick={openConfirmModal}>Update
                    </button>
                    <button className={classes.buttonStyles} onClick={()=>dispatch({type: 'setMembersModal', payload: true})}>Add users
                    </button>
                </div>
            </Modal>
            <Modal className={classes.modalContainer} visible={state.isUserModalOpen}
                   setVisible={() => dispatch({type: 'setMembersModal'})}>
                <ListOfUsers/>
                <button className={classes.buttonStyles} onClick={()=>dispatch({type: 'setMembersModal', payload: false})}>Add</button>
            </Modal>
        </div>
    );
};

export default EventUpdateWindow;
import React from 'react';
import {Modal as ModalBootstrap} from "react-bootstrap";
import "./Modal.scss";
import JmSpinner from '../components/JmSpinner/JmSpinner';


export const ModalHeader = ({children, closeButton, className}) => {
    return (
        <ModalBootstrap.Header className={className} closeButton={closeButton}>
            {children}
        </ModalBootstrap.Header>
    )
}


export const ModalBody = ({children, className, style}) => {
    return (
        <ModalBootstrap.Body className={className} style={style}>
            {children}
        </ModalBootstrap.Body>
    )
}


export const ModalTitle = ({children, className}) => {
    return (
        <ModalBootstrap.Title className={className}>
            {children}
        </ModalBootstrap.Title>
    )
}


export const ModalSubTitle = ({children, className = ''}) => {
    return (
        <p className={"modal-subtitle" + className}>
            {children}
        </p>
    )
}


export const ModalFooter = ({children, className, style}) => {
    return (
        <ModalBootstrap.Footer className={className} style={style}>
            {children}
        </ModalBootstrap.Footer>
    )
}


export default function Modal({children, className = '', isShowing, isLoading, hideSeparation = false, toggle, text = "Jean-Michel CHARGETOU"}) {

    return (
        isShowing &&
            <ModalBootstrap show={isShowing} onHide={toggle} className={className + " modal-custom p-2" + (hideSeparation ? ' hide-separator' : '')}>
                <div className="modal-wrapper">
                    {children}

                    {isLoading &&
                        <div className="modal-loading">
                            <JmSpinner customStyle={{backgroundColor: "white"}} text={text}/>
                        </div>
                    }
                </div>
            </ModalBootstrap>
    )
}
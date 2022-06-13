import "./band.scss"
import {Row, Col, Container} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import valueWithSpaces from "../../utils/valueWithSpaces";


export default function SunsetBand({ keys, reverse = false }){

    const getClassName = () => {
        let _className = "band sunset"
        if(keys.length === 1) {
            _className += " simple"
        }
        if(reverse){
            _className += " reverse"
        }
        return _className
    }


    return(
        <Container fluid className={getClassName()}>
            <Row className={"band-wrapper"}>

                {keys && keys.length > 1 && keys.map((key, index) =>
                    <Col key={index} className={"band-item"} md={4}>
                        <FontAwesomeIcon className={"icon"} icon={key.icon} />
                        <div className={"band-text"}>
                            <span>{valueWithSpaces(key.value.data) + " " + key.value.marker}</span>
                            <p>{key.text}</p>
                        </div>
                        {index < keys.length - 1 && <hr/>}
                    </Col>
                )}

                {keys && keys.length === 1 &&
                    <Col lg={6} className={"band-item"}>
                        <hr className={"hr-first"}/>
                        <div className={"band-text"} style={{fontSize: '25px'}}>
                            {keys[0]}
                        </div>
                        <hr/>
                    </Col>
                }
            </Row>
        </Container>
    )
}
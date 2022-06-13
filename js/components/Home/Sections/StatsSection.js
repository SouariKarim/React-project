import "./sections.scss"
import SecondaryTitle from "../../Titles/SecondaryTitle";
import {Container, Row, Col} from "react-bootstrap";
import TextTitle from "../../Titles/TextTitle";
import RepartitionStat from "../../../res/illustrations/repartition-freelance-region.svg"
import RepartitionPie from "../../../res/illustrations/repartition-freelance-pie.svg"


export default function StatsSection({className = ''}) {

    return(
        <section className={"stats " + className}>
            <SecondaryTitle title={"Jean-Michel STATS"}/>
            <Container fluid>
                <Row className={"justify-content-center"}>
                    <Col lg={6} className={"stat-item"}>
                        <TextTitle title={"Freelances par région"}/>
                        <img src={RepartitionStat} alt={"repartition freelance par région"}/>
                    </Col>

                    <Col lg={6} className={"stat-item"}>
                        <TextTitle title={"Freelances par métier"}/>
                        <img src={RepartitionPie} alt={"repartition freelance par secteur"}/>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}
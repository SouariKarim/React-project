import React, {useContext, useEffect, useRef, useState} from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import "../FreelanceProfile.scss";
import Button from "../../Buttons/Button";
import "./FreelanceCtaCard.scss";
import { ModalContext } from "../../../contexts/ModalContext";
import useFreelancesApi from "../../../hooks/useFreelancesApi";
import useToast from "../../../hooks/useToast";
import useAuthManager from "../../../hooks/useAuthManager";


export default function FreelanceCtaCard({ freelance }) {

  const {toggleFreelanceContact} = useContext(ModalContext);
  const {isLogged} = useAuthManager()
  const { addToBookmark, removeFromBookmark, getResumeUrl } = useFreelancesApi();
  const isMounted = useRef();
  const [isBookmarked, setBookmarked] = useState(freelance.is_bookmarked)
  const toast = useToast()


  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const addFreelanceToBookmark = () => {
    toast.promise({
      promise: addToBookmark(freelance.id),
      loadingText: "Ajout du freelance aux favoris",
      successText: "Freelance ajouté à vos favoris !",
      errorText: isLogged() ? "Une erreur est survenue" : "Vous devez être connecté",
      style: {minWidth: 300}
    }).then((response) => {
      freelance.is_bookmarked = response === true;
      setBookmarked( response === true)
    })
  }


  const removeFreelanceFromBookmark = () => {
    toast.promise({
      promise: removeFromBookmark(freelance.id),
      loadingText: "Suppression du freelance des favoris",
      successText: "Freelance supprimé de vos favoris !",
      style: {minWidth: 330},
    }).then((response) => {
      freelance.is_bookmarked = !response === true;
      setBookmarked( !response === true)
    });
  };


  return (
    <div className={"freelance-cta-card"}>
      <Row>
        <Col xs={12} xl={{ offset: 5, span: 6 }} sm={{ offset: 2, span: 9 }}>
          <Row className={"justify-content-end"}>
            <Col
              xs={6}
              md={{ offset: 2, span: 6 }}
              xl={{ offset: 0, span: 5 }}
              className={"pe-3"}
            >
              <Button variant={"cta secondary"} onClick={() => toggleFreelanceContact({freelance: freelance})}>
                Coordonnées
              </Button>
            </Col>
            <Col xs={6} xl={{ offset: 0, span: 4 }} md={4}>
              <Dropdown className={"see-more-dropdown"}>
                <Dropdown.Toggle className={"see-more-button"}>
                  Plus ...
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {isBookmarked ? (
                      <Dropdown.Item
                          href="#"
                          onClick={removeFreelanceFromBookmark}
                      >
                        Retirer des favoris
                      </Dropdown.Item>
                  ) : (
                      <Dropdown.Item href="#" onClick={addFreelanceToBookmark}>
                        Ajouter aux favoris
                      </Dropdown.Item>
                  )}

                    <Dropdown.Item
                      href={freelance.hasResume ? getResumeUrl({freelance, absolute: true}): null}
                      target={"_blank"}
                      disabled={!freelance.hasResume || !freelance.can_open_freelance}
                    >
                      {"Enregistrer le CV au format PDF"}
                    </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}
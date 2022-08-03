import React from 'react';
import useAuthManager from '../../hooks/useAuthManager';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './CreditManage.scss';
import Constant from '../../constant';

export default function CreditManage() {
  const { user, isCollaborator, isInTrialPeriod } = useAuthManager();

  return (
    <Container className={'credit-manage'} fluid>
      <Card as={Col} xs={12} body={true}>
        <p className={'bloc-title'}>Mon forfait</p>
        <Row>
          {user && isCollaborator() === false && (
            <>
              <Col xs={{ span: 12, order: 1 }} md={{ span: 12, order: 1 }}>
                <p className={'bloc-text'}>
                  Type d'abonnement :{' '}
                  <span className={'bloc-data'}>
                    {user.subscription.name} {isInTrialPeriod() ? '(Test)' : ''}
                  </span>
                </p>
              </Col>

              {user.subscription_code.toUpperCase() !==
                Constant.SUBSCRIPTION_CODE_RADIN && (
                <Col xs={{ span: 12, order: 1 }} md={{ span: 12, order: 1 }}>
                  {isInTrialPeriod() ? (
                    <p className={'bloc-text'}>
                      Votre test se termine dans :{' '}
                      <span className={'bloc-data'}>
                        {user.subscription_expiration_timer}
                      </span>
                    </p>
                  ) : (
                    <p className={'bloc-text'}>
                      Votre abonnement se termine dans :{' '}
                      <span className={'bloc-data'}>
                        {user.subscription_expiration_timer}
                      </span>
                    </p>
                  )}
                </Col>
              )}
            </>
          )}
          <Col
            xs={{ span: 12, order: 1 }}
            md={{ span: 12, order: 1 }}
            className={'mb-4'}
          >
            <p className={'bloc-text'}>
              Crédits gratuits utilisés ce mois :{' '}
              <span className={'bloc-data'}>
                {user.credits_consume}/{user.credits_available}
              </span>
            </p>
          </Col>

          <Col
            xs={{ span: 12, order: 2 }}
            md={{ span: 12, order: 2 }}
            className={'info-details'}
          >
            <p className={'bloc-text'}>1 crédit = 1 ouverture de profil.</p>
          </Col>
          <Col
            xs={{ span: 12, order: 3 }}
            md={{ span: 12, order: 3 }}
            className={'info-details'}
          >
            <p className={'bloc-text'}>
              Les crédits sont réinitialisés chaque début de mois.
            </p>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

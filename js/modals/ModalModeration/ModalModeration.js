// a modal for moderation
import React, { useContext, useEffect, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../Modal';
import './ModalModeration.scss';
import Button from '../../components/Buttons/Button';
import { PulseLoader } from 'react-spinners';
import useFreelancesApi from '../../hooks/useFreelancesApi';
import { faPen, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CopyToClipBoard from '../../components/CopyToClipBoard/CopyToClipBoard';
import useToast from '../../hooks/useToast';

export default function ModalModeration() {
  const { isShowingModeration, toggleModeration, optionModeration } =
    useContext(ModalContext);
  const [loading, setLoading] = useState(false);
  const { moderateFreeelance, refreshFreelance } = useFreelancesApi();
  const freelance = optionModeration ? optionModeration.freelance : null;
  const toast = useToast();
  const [error, setError] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [moderationData, setModerationData] = useState({
    notIt: false,
    isCdi: false,
    isInterco: false,
    isStudent: false,
    isForeign: false,
    newLinkedIn: '',
    noLinkedIn: false,
    doNotSolicit: freelance?.doNotSolicit ?? false,
  });

  const updateModerationData = (key, value) => {
    const data = { ...moderationData };
    data[key] = value;

    if (key === 'newLinkedIn' && value !== '') {
      data.noLinkedIn = false;
    }

    if (key === 'noLinkedIn' && value === true) {
      data.newLinkedIn = '';
    }

    if (key === 'isCdi' && value === true) {
      data.isInterco = false;
    }

    if (key === 'isInterco' && value === true) {
      data.isCdi = false;
    }

    setModerationData(data);
  };

  useEffect(() => {
    setModerationData({
      notIt: false,
      isCdi: false,
      isInterco: false,
      isStudent: false,
      isForeign: false,
      newLinkedIn: '',
      noLinkedIn: false,
      doNotSolicit: freelance?.doNotSolicit ?? false,
    });
    setError(null);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowingModeration]);

  const handleError = (error) => {
    const data = error.response ? error.response.data : null;

    if (data && data.message) {
      setError(data.message);
    } else if (data && data.errors) {
      const errors = Object.values(data.errors);
      setError(errors[0]);
    } else {
      setError('Une erreur est survenue.');
    }
  };

  const handleRefresh = () => {
    setLoading(true);

    refreshFreelance(freelance.id)
      .then(() => {
        setRefreshing(true);
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();

    toast
      .promise({
        promise: moderateFreeelance(freelance.id, moderationData),
        loadingText: 'Application de la modération',
        successText: 'Freelance modéré avec succès !',
        style: { minWidth: 280 },
      })
      .then((response) => {
        if (response && response.ok === true) {
          setError(null);
          toggleModeration();
        }
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      isShowing={isShowingModeration}
      toggle={toggleModeration}
      className={'moderation-modal'}
      hideSeparation
    >
      <ModalHeader closeButton>
        <ModalTitle>Jean-Michel MODÉRATION</ModalTitle>
      </ModalHeader>

      <ModalBody>
        {freelance && (
          <div className={'about-freelance'}>
            <div className={'panel'}>
              <h4>{freelance.full_name}</h4>
              <p>
                Maj à {freelance.profileUpdatedAt.format('hh:mm')} le{' '}
                {freelance.profileUpdatedAt.format('DD/MM/YYYY')}
              </p>

              {freelance.isRefreshing || isRefreshing ? (
                <span className={'refreshing'}>
                  <FontAwesomeIcon icon={faSync} />
                  En cours de rafraîchissement
                </span>
              ) : loading ? (
                <div className={'loader'}>
                  <PulseLoader color={'#354255'} />
                </div>
              ) : (
                <Button variant={'cta secondary'} onClick={handleRefresh}>
                  Rafraîchir le freelance
                </Button>
              )}
            </div>

            <div className={'panel'}>
              <p>
                ID BlackBox :
                <CopyToClipBoard
                  toCopy={freelance.blackboxFreelanceId ?? '---------'}
                  valueClassName={'freelance-id'}
                >
                  {freelance.blackboxFreelanceId ?? '---------'}
                </CopyToClipBoard>
              </p>
              <p>
                ID Godzilla : &nbsp;
                <CopyToClipBoard
                  toCopy={freelance.id}
                  valueClassName={'freelance-id'}
                >
                  {freelance.id}
                </CopyToClipBoard>
              </p>
            </div>
          </div>
        )}

        <form className={'moderation-form'} onSubmit={handleSubmit}>
          <label className={'form-section'}>
            <input
              name={'type'}
              checked={moderationData.doNotSolicit}
              type={'checkbox'}
              onChange={() =>
                updateModerationData(
                  'doNotSolicit',
                  !moderationData.doNotSolicit
                )
              }
            />
            Ne pas soliciter ce freelance dans les campagnes
          </label>

          <label className={'form-section'}>
            <input
              name={'type'}
              checked={moderationData.isCdi}
              type={'checkbox'}
              onChange={() =>
                updateModerationData('isCdi', !moderationData.isCdi)
              }
            />
            Ce profil n'est pas Freelance (cdi)
          </label>

          <label>
            <input
              name={'type'}
              checked={moderationData.isInterco}
              type={'checkbox'}
              onChange={() =>
                updateModerationData('isInterco', !moderationData.isInterco)
              }
            />
            Ce profil n'est pas Freelance (interco)
          </label>

          <label>
            <input
              name={'type'}
              checked={moderationData.notIt}
              type={'checkbox'}
              onChange={() =>
                updateModerationData('notIt', !moderationData.notIt)
              }
            />
            Ce profil n'est pas IT
          </label>

          <label>
            <input
              name={'type'}
              checked={moderationData.isForeign}
              type={'checkbox'}
              onChange={() =>
                updateModerationData('isForeign', !moderationData.isForeign)
              }
            />
            Ce profil est étranger
          </label>

          <label>
            <input
              name={'type'}
              checked={moderationData.isStudent}
              type={'checkbox'}
              onChange={() =>
                updateModerationData('isStudent', !moderationData.isStudent)
              }
            />
            Ce profil est étudiant
          </label>

          <label className={'linkedin form-section'}>
            Le LinkedIn relié semble incorrect (comparé au CV) :
            <input
              type={'text'}
              value={moderationData.newLinkedIn}
              placeholder={'Nouvelle URL LinkedIn pour ce profil'}
              onChange={(e) =>
                updateModerationData('newLinkedIn', e.currentTarget.value)
              }
            />
          </label>

          <label className={'linkedin-sub'}>
            <input
              name={'type'}
              checked={moderationData.noLinkedIn}
              type={'checkbox'}
              onChange={() =>
                updateModerationData('noLinkedIn', !moderationData.noLinkedIn)
              }
            />
            LinkedIn introuvable ?
          </label>

          <div className={'actions'}>
            {loading ? (
              <div className={'loader'}>
                <PulseLoader color={'#354255'} />
              </div>
            ) : (
              <Button variant={'cta secondary'} type={'submit'}>
                <FontAwesomeIcon icon={faPen} />
                Modérer
              </Button>
            )}
            <Button variant={'link'} onClick={toggleModeration}>
              Annuler
            </Button>
          </div>

          {error && <p className={'error'}>{error}</p>}
        </form>
      </ModalBody>
    </Modal>
  );
}

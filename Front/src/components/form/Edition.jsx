import { Modal, Button, Form, ButtonToolbar, Message, toaster } from 'rsuite';
import { useState, useRef, createContext, useEffect } from 'react';
import { useCreate } from "@src/hooks/request";
import useStore from "@src/store/research";
const ErrorContext = createContext({});


export default function Edition(props) {
  const {
    name,
    title,
    model,
    action,
    target,
    children,
    defaultValue,
    successMessage = 'Opération réussie'
  } = props

  const formRef = useRef();
  const [_, setFormError] = useState({});
  const [formValue, setFormValue] = useState(defaultValue);
  const { errors, create, update, resetErrors } = useCreate(target);
  const { activeModal, hideModal, closeBook, triggerRefresh } = useStore();


  useEffect(() => {
    setFormValue(defaultValue)
  }, [defaultValue]);

  const handleSubmit = async() => {
    if (!formRef.current.check()) return;

    let success = null
    if (action === 'create')
      success = await create(action, formValue)
    else if (action === 'update')
      success = await update(action, formValue, defaultValue.id)

    if (success) {
      toaster.push(<Message type="success">{successMessage}</Message>);
      setFormValue({})
      hideModal()
      closeBook()
      triggerRefresh()
    }
    else if(success === false){
      toaster.push(<Message type="error">Erreur serveur</Message>);
    }
  };


  const handleClear = () => {
    setFormValue(defaultValue)
    resetErrors()
  }


  return (
    <Modal backdrop='static' keyboard={false} open={activeModal === name} onClose={hideModal}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <br />
        <Form
          fluid
          model={model}
          ref={formRef}
          onChange={setFormValue}
          onCheck={setFormError}
          formValue={formValue}>
          <ErrorContext.Provider value={{customErrors: errors}}>
            {children}
          </ErrorContext.Provider>
          <ButtonToolbar />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClear} appearance="subtle" className='float-left'> Réinitialiser </Button>
        <Button onClick={handleSubmit} appearance="primary"> { action === 'create' ? 'Créer' : 'Modifier' } </Button>
        <Button onClick={hideModal} appearance="subtle"> Annuler </Button>
      </Modal.Footer>
    </Modal>
  )
}

export { ErrorContext }
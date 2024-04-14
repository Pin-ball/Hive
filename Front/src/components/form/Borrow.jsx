import {Schema } from 'rsuite';
import { Field } from '@src/components/form/Fields'
import Edition from "@src/components/form/Edition";


const { StringType } = Schema.Types;
const model = Schema.Model({
  customerEmail: StringType().isEmail('Doit être un email valide').isRequired('Requis'),
});


const Loading = () =>  (
  <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>
    Chargement...
  </p>
)


export default function Borrow(props) {
  const { book } = props

  const def = {
    bookId: book.id,
    bookTitle: book.title,
    customerEmail: '',
  };

  return (
    <Edition
      name='borrow'
      model={model}
      target='borrow'
      action='create'
      defaultValue={def}
      title='Nouvel emprunt'
      successMessage='Livre emprunté'
    >
      <Field disabled name="bookId" className='!hidden' />
      <Field disabled name="bookTitle" label="Livre" />
      <Field name="customerEmail" label="Email emprunteur" />
    </Edition>
  )
}

import { Schema } from 'rsuite';
import { useCreate } from "@src/hooks/request";
import { Field, Textarea } from '@src/components/form/Fields';
import { formatToForm } from "@src/utils/listing";
import Edition from "@src/components/form/Edition";


const { StringType } = Schema.Types;
const model = Schema.Model({
  name: StringType().isRequired('Requis'),
  biography: StringType().isRequired('Requis'),
  country: StringType().isRequired('Requis')
});

const Fields = () => (
  <>
    <Field name="name" label="Nom" />
    <Field name="biography" label="Biographie" accepter={Textarea} />
    <Field name="country" label="Pays" />
  </>
)

export function CreateAuthor() {
  const def = {
    name: '',
    biography: '',
    country: ''
  }

  return (
    <Edition
      name='createAuthor'
      model={model}
      target='author'
      action='create'
      title='Nouvel auteur'
      successMessage='Auteur ajouté'
      defaultValue={def}
    >
      <Fields />
    </Edition>
  )
}


export function UpdateAuthor(props) {
  const { author } = props

  return (
    <Edition
      name='updateAuthor'
      model={model}
      target='author'
      action='update'
      title='Modification auteur'
      successMessage='Auteur modifié'
      defaultValue={formatToForm(author)}
    >
      <Fields />
    </Edition>
  )
}

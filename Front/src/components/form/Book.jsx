import { DatePicker, InputPicker, Schema } from 'rsuite';
import { Field, Textarea } from '@src/components/form/Fields'
import { useAutoComplete, useCreate } from "@src/hooks/request";
import { formatToForm } from "@src/utils/listing";
import Edition from "@src/components/form/Edition";


const { StringType, DateType, NumberType } = Schema.Types;
const model = Schema.Model({
  title: StringType().isRequired('Requis'),
  resume: StringType().isRequired('Requis'),
  authorId: NumberType().isRequired('Requis'),
  editor: StringType().isRequired('Requis'),
  genre: StringType().isRequired('Requis'),
  pages: NumberType('Doit être un nombre').isRequired('Requis'),
  ISBN: StringType().isRequired('Requis'),
  language: StringType().isRequired('Requis'),
  publicationDate: DateType().isRequired('Requis')
});


const def = {
  title: '',
  resume: '',
  authorId: '',
  editor: '',
  genre: '',
  pages: '',
  ISBN: '',
  language: '',
  publicationDate: null
};


const Fields = (props) => {
  const { def } = props

  //TODO: Ne pas remplir l'autoComplete mais plutôt mettre la value dans l'inputPicker
  const autoCompleteDef = def?.author ? [def.author] : []
  const {data, loading, get} = useAutoComplete('author');

  return (
    <>
      <Field name="title" label="Titre"/>
      <Field name="resume" label="Résumé" accepter={Textarea}/>
      <Field
        label="Auteur"
        name="authorId"
        accepter={InputPicker}
        data={data}
        valueKey="id"
        labelKey="name"
        onSearch={get}
        placeholder='Sélectionner'
        renderMenu={menu => {
          if (loading) return <Loading/>
          return menu
        }}/>
      <Field name="publicationDate" label="Date de publication" placeholder='aaaa-mm-jj' accepter={DatePicker}/>
      <Field name="editor" label="Editeur"/>
      <Field name="genre" label="Genre"/>
      <Field name="pages" label="Nombre de pages"/>
      <Field name="ISBN" label="ISBN"/>
      <Field name="language" label="Langue"/>
    </>
  )
}


const Loading = () =>  (
  <p style={{ padding: 10, color: '#999', textAlign: 'center' }}>
    Chargement...
  </p>
)


export function CreateBook() {
  return (
    <Edition
      name='createBook'
      model={model}
      target='book'
      action='create'
      title='Nouveau livre'
      successMessage='Livre ajouté'
      defaultValue={def}
    >
      <Fields />
    </Edition>
  )
}

export function UpdateBook(props) {
  const { book } = props

  return (
    <Edition
      name='updateBook'
      model={model}
      target='book'
      action='update'
      title='Modification livre'
      successMessage='Livre modifié'
      defaultValue={formatToForm(book)}
    >
      <Fields def={book}/>
    </Edition>
  )
}

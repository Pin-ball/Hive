import { useAutoComplete } from '@src/hooks/request';
import useStore from "@src/store/research";
import {TagPicker, CheckboxGroup, Checkbox } from 'rsuite';


export default function Research() {
  const {data: books, loading: loadingBooks, get: getBooks} = useAutoComplete('book');
  const {data: authors, loading: loadingAuthors, get: getAuthors} = useAutoComplete('author');
  const { book, author, availability, setValue, setCacheData, setAvailability } = useStore();

  const handleValue = (target, value) => {
    setValue(target, value);
  };

  const handleSelect = (target, item) => {
    setCacheData(target, item);
  };

  const Loading = () => (
    <p className='p-1 text-c-gray-200 text-center'>
      Loading...
    </p>
  )


  return (
    <>
      <h3 className='pb-8 text-xl font-extralight text-neutral-100'>FILTRES</h3>

      <p className='pb-1 text-c-gray-100'>Titre</p>
      <TagPicker
      data={books}
      cacheData={book.cacheData}
      value={book.value}
      className='w-full'
      labelKey="title"
      valueKey="id"
      onSearch={getBooks}
      placeholder='Sélectionner'
      onChange={(value) => handleValue('book', value)}
      onSelect={(_, item) => handleSelect('book', item)}
      renderMenu={menu => {
        if (loadingBooks) return <Loading />;
        return menu
      }}
      />

      <p className='pt-5 pb-1 text-c-gray-100'>Auteur</p>
      <TagPicker
        data={authors}
        cacheData={author.cacheData}
        value={author.value}
        className='w-full'
        labelKey="name"
        valueKey="id"
        onSearch={getAuthors}
        placeholder='Sélectionner'
        onChange={(value) => handleValue('author', value)}
        onSelect={(_, item) => handleSelect('author', item)}
        renderMenu={menu => {
          if (loadingBooks) return <Loading />;
          return menu
        }}
      />

      <p className='pt-5 pb-1 text-c-gray-100'>Disponibilité</p>
      <CheckboxGroup
        name="availability"
        value={availability}
        onChange={setAvailability}>
        <Checkbox value="borrow">
          <span className='inline-block mr-2 size-2 rounded-2xl bg-c-gray-500'></span>
          Emprunté
        </Checkbox>
        <Checkbox value="available">
          <span className='inline-block mr-2 size-2 rounded-2xl bg-c-blue-500'></span>
          Disponible
        </Checkbox>
      </CheckboxGroup>
    </>
  )
}

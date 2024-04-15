import { Tag, TagGroup, Loader, Placeholder, Button, ButtonToolbar, Notification, Message, toaster, useToaster } from 'rsuite';
import useSWR from 'swr'
import { clsx } from "clsx";
import { url } from "@src/utils/config";
import useStore from "@src/store/research";
import { XMarkIcon } from "@heroicons/react/24/outline/index";
import { update } from "@src/utils/borrow";
import Borrow from "@src/components/form/Borrow.jsx";
import { UpdateAuthor } from "@src/components/form/Author";
import { UpdateBook } from "@src/components/form/Book";
import { del } from "@src/hooks/request";

const fetcher = (url) => fetch(url).then((res) => res.json());


export default function Aside() {
  const customToaster = useToaster();
  const { selectedBook, closeBook, showModal, triggerRefresh } = useStore();


  let URL = selectedBook ? `${url.backend}/book/${selectedBook}` : null
  const { data: book, error, isLoading } = useSWR(URL, fetcher)

  if (!selectedBook)
    return null

  if (error)
    toaster.push(<Message type="error">Erreur</Message>);

  if (isLoading) {
    return (
      <aside className='relative mr-3 py-3 px-2 bg-c-gray-800 rounded-2xl border border-c-gray-700 w-96 overflow-scroll'>
        <Placeholder.Paragraph rows={8} />
        <Loader backdrop content="Chargement..." vertical />
      </aside>
      )
  }


  const borrowBook = () => {
    showModal('borrow')
  }

  const returnBook = async () => {
    const success = await update(book.borrowId,{bookId: book.id})
    if (success) {
      toaster.push(<Message type="success">Livre retourné</Message>);
      closeBook()
    }
  }

  const updateBook = async () => {
    showModal('updateBook')
  }

  const updateAuthor = async () => {
    showModal('updateAuthor')
  }

  const message = (action) => (
    <Notification type='warning' header={'Attention !'}>
      <p>Vous êtes sur le points de supprimer cet élément.</p>
      <hr />
      <ButtonToolbar>
        <Button color='red' appearance="primary" onClick={action}>Supprimer</Button>
        <Button appearance="default" onClick={() => customToaster.clear()}>Annuler</Button>
      </ButtonToolbar>
    </Notification>
  );

  const deleteBook = async () => {
    const action = async () => {
      customToaster.clear()
      const success = await del('book', book.id)
      setTimeout(() => {
        feedback(success, "Livre supprimé")
        closeBook()
        triggerRefresh()
      }, 1000)
    }

    customToaster.push(message(action), {duration: 10000})
  }

  const deleteAuthor = async () => {
    const action = async () => {
      customToaster.clear()
      const success = await del('author', book.author.id)
      setTimeout(() => {
        feedback(success, "Auteur supprimé")
        closeBook()
        triggerRefresh()
      }, 1000)
    }

    customToaster.push(message(action), {duration: 10000})
  }


  const feedback = (success, message = 'Opération réussie') => {
    if (success)
      toaster.push(<Message type="success">{message}</Message>);
    else
      toaster.push(<Message type="error">Erreur</Message>);
  }


  const Head = () => (
    <div className='flex justify-between mb-4 py-2 sticky top-0 z-1 bg-c-gray-900'>
      {book.borrowId
        ?
        <Button color='orange' onClick={returnBook} className='w-full mr-2' appearance="primary">
          Retourner
        </Button>
        :
        <Button  onClick={borrowBook}  className='w-full mr-2' appearance="primary">
          Emprunter
        </Button>
      }
      <Button appearance='subtle' onClick={closeBook}>
        <XMarkIcon className='size-6 fill-c-gray-100' />
      </Button>
    </div>
  )


  const Book = () => (
    <div className='bg-c-gray-800 rounded-2xl mb-4'>
      <div className='flex justify-between items-center p-2 border-b border-b-c-gray-600 text-center'>
        <h5>{book.title}</h5>
        <span>
          <Button onClick={updateBook} appearance='subtle' size='xs' className='mr-1'>Modifier</Button>
          <Button onClick={deleteBook} appearance='subtle' size='xs' className='hover:!bg-c-red-500'>Supprimer</Button>
        </span>
      </div>
      <div className='p-3'>
        <p className='leading-6 mb-2'>{book.resume}</p>
        <TagGroup>
          <Tag size="md"> <span className='text-c-gray-300 pr-1'>Genre :</span> {book.genre} </Tag>
          <Tag size="md"> <span className='text-c-gray-300 pr-1'>Langue :</span> {book.language}</Tag>
          <Tag size="md"> <span className='text-c-gray-300 pr-1'>Éditeur :</span> {book.editor}</Tag>
          <Tag size="md"> <span className='text-c-gray-300 pr-1'>ISBN :</span> {book.ISBN}</Tag>
          <Tag size="md"> <span className='text-c-gray-300 pr-1'>Pages :</span> {book.pages}</Tag>
        </TagGroup>
      </div>
    </div>
  )

  const Author = () => {
    if(book.author === null) return null
    return (
      <div className='bg-c-gray-800 rounded-2xl mb-4'>
        <div className='flex justify-between items-center p-2 border-b border-b-c-gray-600 text-center'>
          <h5>{book.author.name}</h5>
          <span>
            <Button onClick={updateAuthor}  appearance='subtle' size='xs' className='mr-1'>Modifier</Button>
            <Button onClick={deleteAuthor} appearance='subtle' size='xs' className='hover:!bg-c-red-500'>Supprimer</Button>
          </span>
        </div>
        <div className='p-3'>
          <p className='leading-6 mb-2'>{book.author.biography}</p>
          <TagGroup>
            <Tag size="md"> <span className='text-c-gray-300 pr-1'>Pays :</span> {book.author.country} </Tag>
          </TagGroup>
        </div>
      </div>
    )
  }


  const Borrows = () => {
    if(book.borrows.length === 0) return null

    return (
      <div className='bg-c-gray-800 rounded-2xl mb-4'>
        <div className='flex justify-between items-center p-2 border-b border-b-c-gray-600 text-center'>
          <h5>Emprunts</h5>
        </div>
        <div className='p-3'>
            <ul>
              { book.borrows.map((borrow, i) => (
                <li key={i} className={clsx('pl-3 py-1 mb-2 rounded-r-lg',
                  {'border-c-gray-500 border-l': borrow.end,
                    'border-c-blue-500 border-l-2': borrow.end === null}
                )}>
                  <div>{borrow.customerEmail}</div>
                  <p className='text-c-gray-300 mt-0.5'>{borrow.start !== null && borrow.start.replace('T', ' ').slice(0,16)}
                    {borrow.end !== null && ' - ' + borrow.end.replace('T', ' ').slice(0,16)}</p>
                </li>
              )) }
            </ul>
        </div>
      </div>
    )
  }


  return (
    <aside className='relative mr-3 px-2 w-96 overflow-scroll max-h-full'>
      <Head />
      <Book />
      <Author />
      <Borrows />

      <UpdateBook book={book}/>
      <UpdateAuthor author={book.author}/>
      <Borrow book={book}/>
    </aside>
  )
}

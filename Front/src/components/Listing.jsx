import { clsx } from 'clsx';
import { Table, Loader } from 'rsuite';
import { useInfiniteScroll } from "@src/hooks/infiniteScroll";
import { infiniteScrollTrigger } from '@src/utils/listing'
import { url } from '@src/utils/config'
import useStore from "@src/store/research";
import {useEffect, useState} from "react";

const { Column, HeaderCell, Cell } = Table;
const defaultUrl = `${url.backend}/book/list`
export default function Listing() {
  const [requestUrl, setRequestUrl] = useState(defaultUrl)
  const { data, isLoading, next } = useInfiniteScroll(requestUrl)
  const { book, author, availability, seeBook } = useStore();

  useEffect(() => {
    let newUrl = new URL(defaultUrl);

    if (book.value.length > 0)
      newUrl.searchParams.append('ids', book.value.join(','));
    if (author.value.length > 0)
      newUrl.searchParams.append('authorIds', author.value.join(','));

    for (const key of availability) {
      newUrl.searchParams.append(key, 'true');
    }

    setRequestUrl(newUrl.href)
  }, [book, author, availability]);


  const handleScroll = (x, y) => {
    infiniteScrollTrigger(y, data, next)
  };

  const openBook = (rowData) => {
    seeBook(rowData.id)
  }

  return (
    <>
      <main className='grow px-2'>
        <Table
          data={data}
          virtualized
          // height={800}
          // autoHeight={true}
          fillHeight={true}
          onRowClick={openBook}
          onScroll={handleScroll}
          shouldUpdateScroll={true}
          className='rounded-2xl'
        >
          <Column className='!bg-transparent' width={60} align="center" fixed>
            <HeaderCell>Dispo</HeaderCell>
            <Cell dataKey="">
              {rowData => (
                <div className={clsx('mt-1.5 size-2 rounded-2xl', {
                  'bg-c-gray-500': rowData.borrowId,
                  'bg-c-blue-500': !rowData.borrowId
                })}></div>
              )}
            </Cell>
          </Column>

          <Column className='!bg-transparent' flexGrow={2} width={150}>
            <HeaderCell>Titre</HeaderCell>
            <Cell dataKey="title"/>
          </Column>

          <Column className='!bg-transparent' flexGrow={1} width={100}>
            <HeaderCell>Auteur</HeaderCell>
            <Cell dataKey="authorName" />
          </Column>

          <Column className='!bg-transparent' flexGrow={1} width={50}>
            <HeaderCell>Genre</HeaderCell>
            <Cell dataKey="genre" />
          </Column>
        </Table>
        {
          isLoading
          ? <Loader
            content="Chargement"
            className='!flex !justify-center !w-full py-3 bg-c-gray-800'
          />
          : null
        }
      </main>
    </>
  )
}
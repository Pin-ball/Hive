import {Content, Sidebar} from 'rsuite';
import Listing from "@src/components/Listing";
import Filters from "@src/components/Filters";
import Aside from "@src/components/Aside";
import { CreateAuthor } from "@src/components/form/Author.jsx";
import { CreateBook } from "@src/components/form/Book";

export default function Research() {

  return (
    <>
      <Sidebar className='px-2 py-3 bg-c-gray-800 rounded-r-2xl border-s-transparent'>
        <Filters />
      </Sidebar>

      <Content className='flex'>
        <Listing />
        <Aside />
      </Content>

      <CreateBook />
      <CreateAuthor />
    </>
  )
}

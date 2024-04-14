import { Header, Dropdown } from 'rsuite';
import useStore from "@src/store/research";

export default function TopBar() {
  const { showModal } = useStore();

  return (
    <Header className='p-3 flex justify-between '>
      <div>
        <img src='./hive.svg' className='inline mr-2 w-7' alt='Hive'/>
        <span className='font-bold text-lg align-bottom'>Hive</span>
      </div>

      <Dropdown title="Créer" noCaret placement="bottomEnd" appearance="primary">
        <Dropdown.Item onClick={()=>{showModal('createBook')}}>Livre</Dropdown.Item>
        <Dropdown.Item onClick={()=>{showModal('createAuthor')}}>Auteur</Dropdown.Item>
      </Dropdown>
    </Header>
  )
}

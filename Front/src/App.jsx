import { Container, Footer } from 'rsuite';
import TopBar from '@src/components/TopBar';
import Research from '@src/components/Research';

function App() {

  return (
    <Container className='h-screen max-h-screen overflow-hidden'>
      <TopBar />

      <Container className='h-[90%]'>
        <Research />
      </Container>

      <Footer className='px-3 pt-2 text-c-gray-200 text-[12px]' >Hive by Damien Herrero</Footer>
    </Container>
  )
}

export default App

import type { MetaFunction } from '@remix-run/node';
import { Link } from '~/components/basic/Link';
import { Container } from '~/components/landing/container';
import { ROUTES } from '~/constants';

export const meta: MetaFunction = () => {
  return [
    { title: 'Send My Reads' },
    {
      name: 'description',
      content:
        'A personalized book organization platform that lets you seamlessly sort your reading collections and send them to your Kindle via email for on-the-go reading convenience.',
    },
  ];
};

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <header className="p-5">
        <Container className="flex justify-center lg:justify-between items-center flex-wrap gap-4 p-4 text-primaryColor bg-secondaryColor rounded-md">
          <section className="flex items-center gap-2">
            <img src="/Icon.svg" alt="Send My Reads" />
            <h1 className="font-bold">Send My Reads</h1>
          </section>
          <nav className="flex items-center gap-4">
            <Link to={''}>Features</Link>
            <Link to={''}>How it works</Link>
          </nav>

          <nav className="flex items-center gap-4">
            <Link to={ROUTES.LOGIN}>Login</Link>
            <Link special to={ROUTES.REGISTER}>
              Get Started
            </Link>
          </nav>
        </Container>
      </header>
      <main className="flex flex-col items-center justify-center gap-5 mb-10 lg:mb-20 p-4">
        {/* Hero */}
        <Container className="my-40 flex flex-col justify-center items-center gap-6 lg:gap-10">
          <section className="flex flex-col items-center gap-6 lg:gap-10">
            <div className="flex flex-col items-center gap-2">
              <p className="italic">Personalized book organization</p>
              <p className="text-2xl lg:text-4xl lg:max-w-3xl">
                <b>Organize</b> your books, <b>Send</b> them to Kindle,{' '}
                <b>Read</b> anywhere
              </p>
            </div>
            <p className="text-sm lg:text-lg lg:max-w-3xl">
              Transform how you manage and enjoy your reading collections.
              Easily organize and send books to your Kindle for uninterrupted
              reading.
            </p>
          </section>
          <img src="/Hero.svg" alt="Send My Reads" />
        </Container>
        {/* Bento box */}
        <Container className="mb-10">
          <section>
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-3 grid-rows-2 gap-4 max-w-4xl mx-auto">
                <div className="col-span-2 row-span-1 bg-[#EEEAE4] p-10 rounded-lg">
                  <p className="text-secondaryColor font-semibold text-center">
                    Whether it&apos;s PDFs, ePub, or other formats, Send My
                    Reads supports a wide range of file types for easy
                    uploading.
                  </p>
                </div>
                <div className="col-span-1 row-span-1 bg-[#EBECE6] p-6 rounded-lg text-center">
                  <p className="text-secondaryColor font-semibold text-center">
                    Easy Kindle Integration
                  </p>
                </div>
                <div className="col-span-1 row-span-1 bg-[#EBECE6] p-6 rounded-lg flex justify-center items-center">
                  <img src="/Book.svg" alt="Book icon" className="w-16 h-16" />
                </div>
                <div className="col-span-2 row-span-1 bg-[#EEEAE4] p-6 rounded-lg">
                  <p className="text-secondaryColor font-semibold text-center">
                    Create custom categories and organize your books based on
                    genres, topics, or your own reading preferences.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </Container>
        {/* How it works */}
        <Container className="flex flex-col justify-center items-center gap-10">
          <h1 className="text-2xl font-bold">How it works</h1>
          <img src="./Steps.png" alt="How it works steps" />
        </Container>
      </main>
      <footer className="bg-[#F6EBDE]">
        <Container className="p-10 flex flex-wrap flex-col-reverse lg:flex-row justify-between gap-10 w-full">
          <section className="flex flex-col text-start gap-4">
            <img
              src="./Big-logo.svg"
              alt="Send my reads logo"
              className="w-20"
            />
            <p>© 2024 Send My Reads, Inc.</p>
            <p>All rights reserved.</p>
          </section>

          <section className="flex flex-col items-start">
            <h1 className="font-bold text-lg">Connect with us</h1>
            <p>Twitter</p>
            <p>Blog</p>
          </section>

          <section className="flex flex-col items-start">
            <h1 className="font-bold text-lg">Stay informed</h1>
            <p>Privacy</p>
            <p>Cookies</p>
          </section>
        </Container>
      </footer>
    </div>
  );
}

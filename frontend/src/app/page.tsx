import { Text, Title } from '@mantine/core';
import { SubmitFile } from './components/SubmitFile';

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      <header className="flex justify-center items-center bg-slate-700 rounded-md p-2 shadow-md">
        <div className="max-w-lg w-full text-center">
          <Title>
            <span className="text-orange-500">E</span>pub{' '}
            <span className="text-orange-500">S</span>ize{' '}
            <span className="text-orange-500">R</span>educer
          </Title>
        </div>
      </header>
      <section className="flex flex-col self-center justify-evenly max-w-lg w-full h-full gap-8  mt-8">
        <SubmitFile />
        <section className="flex flex-col lg:gap-8 gap-4">
          <div>
            <Text className="text-justify">
              Ever tried to send that <b>light novel</b> to your kindle just to
              be hit with the 25mb limit in the email?
            </Text>
            <Text className="text-justify">
              Well me too! This tool will compress your epub file to a smaller
              size and send it to your kindle.
            </Text>
          </div>
          <div>
            <Text size="lg" fw={'bold'} className="text-center">
              How to use the ESR
            </Text>
            <Text>1. Make sure you have a kindle email address</Text>
            <Text>2. Type the email address</Text>
            <Text>
              3. Upload your epub file by dropping or clicking the upload button
            </Text>
            <Text>4. Click the send button</Text>
            <Text>5. Wait for the email to arrive in your kindle device</Text>
          </div>
        </section>
      </section>
    </main>
  );
}

import { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
  return [{ title: 'Perfil | Send My Reads' }];
};

export default function Page() {
  return (
    <div>
      <h1>Meu perfil</h1>
    </div>
  );
}

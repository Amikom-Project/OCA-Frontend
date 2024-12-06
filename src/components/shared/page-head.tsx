import { Helmet } from 'react-helmet-async';

export default function pPageHead({ title = 'One Collecting Agent' }) {
  return (
    <Helmet>
      <title> {title} </title>
    </Helmet>
  );
}

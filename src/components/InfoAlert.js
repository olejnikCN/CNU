import { Alert } from 'reactstrap';

export function InfoAlert(props) {
  const { text } = props;

  return (
    <Alert color="info" className='d-flex justify-content-center'>{text}</Alert>
  );
}

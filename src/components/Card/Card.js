import css from './Card.module.css';

function Card(props) {
  return (
    <div className={css['card']}>
      <h3 className={css['card-title']}>{props.title}</h3>
      <p className={css['card-description']}>{props.description}</p>
    </div>
  );
}

export default Card;

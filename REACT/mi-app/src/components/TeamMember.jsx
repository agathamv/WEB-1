//import React from 'react'; //Opcional, es para versiones antiguas
import '../styles/TeamMember.css';

function TeamMember(props) {
  return (
    <div className='cont-teamMember'>
      <img 
        className='img-member' 
        src={require(`../images/${props.image}.png`)}
        alt={`Foto de ${props.image}`} />
      <div className='cont-text'>
        <p className='name-member'>{props.name}</p>
        <p className='position-member'>{props.position}</p>
        <p className='description-member'>{props.description}</p>
      </div>
    </div>
  );
}

// Existe exportanción nombrada (varias): export function TeamMember() (al importar hay que indicar entre llaves { TeamMembe r})

// y por defecto (el único elemento a exportar), no es necesario indicar entre llaves TeamMember:
export default TeamMember;